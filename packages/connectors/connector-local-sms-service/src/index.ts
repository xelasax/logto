import { assert } from '@silverhand/essentials';
import { got, HTTPError } from 'got';

import type {
  GetConnectorConfig,
  SendMessageFunction,
  CreateConnector,
  SmsConnector,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
  replaceSendMessageHandlebars,
  getConfigTemplateByType,
} from '@logto/connector-kit';

import { defaultMetadata } from './constant.js';
import { localSmsConfigGuard } from './types.js';

const replacePlaceholders = (value: unknown, phone: string, message: string): unknown => {
  if (typeof value === 'string') {
    return value.replaceAll(/{{\s*phone\s*}}/g, phone).replaceAll(/{{\s*content\s*}}/g, message);
  }
  if (Array.isArray(value)) {
    return value.map((item) => replacePlaceholders(item, phone, message));
  }
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value_] of Object.entries(value)) {
      result[key] = replacePlaceholders(value_, phone, message);
    }
    return result;
  }
  return value;
};

const sendMessage =
  (getConfig: GetConnectorConfig): SendMessageFunction =>
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig(config, localSmsConfigGuard);
    const {
      endpoint,
      method = 'POST',
      headers = {},
      queryParams = {},
      bodyParams,
      bodyJson,
      successResponseCodes = [200, 201, 202],
    } = config;

    const template = getConfigTemplateByType(type, config);

    assert(
      template,
      new ConnectorError(
        ConnectorErrorCodes.TemplateNotFound,
        `Cannot find template for type: ${type}`
      )
    );

    const message = replaceSendMessageHandlebars(template.content, payload);

    // Build URL with query parameters (with placeholder replacement)
    const url = new URL(endpoint);
    const finalQueryParams = replacePlaceholders(queryParams, to, message) as Record<
      string,
      string
    >;
    for (const [key, value] of Object.entries(finalQueryParams)) {
      url.searchParams.append(key, String(value));
    }

    // Prepare request options
    const requestOptions: {
      headers: Record<string, string>;
      searchParams?: Record<string, string>;
      form?: Record<string, string>;
      json?: unknown;
    } = {
      headers: { ...headers },
    };

    // Handle GET vs POST
    if (method === 'GET') {
      // For GET, parameters go in query string (already added to URL)
      // No body
    } else {
      // POST method
      if (bodyParams) {
        // Form URL-encoded
        const finalBodyParams = replacePlaceholders(bodyParams, to, message) as Record<
          string,
          string
        >;
        requestOptions.form = { ...finalBodyParams };
        // Ensure content-type if not set
        if (!headers['Content-Type']) {
          requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
      } else if (bodyJson) {
        // JSON body
        const finalBodyJson = replacePlaceholders(bodyJson, to, message) as Record<string, unknown>;
        requestOptions.json = { ...finalBodyJson };
        if (!headers['Content-Type']) {
          requestOptions.headers['Content-Type'] = 'application/json';
        }
      } else {
        // Default: send minimal JSON with phone and message
        requestOptions.json = {
          to,
          message,
          ...payload,
        };
        if (!headers['Content-Type']) {
          requestOptions.headers['Content-Type'] = 'application/json';
        }
      }
    }

    try {
      const response =
        method === 'GET'
          ? await got.get(url.href, requestOptions)
          : await got.post(url.href, requestOptions);

      const { statusCode } = response;
      if (!successResponseCodes.includes(statusCode)) {
        throw new ConnectorError(
          ConnectorErrorCodes.General,
          `Unexpected response status: ${statusCode}. Response: ${response.body}`
        );
      }

      return response;
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const {
          response: { body: rawBody },
        } = error;
        assert(
          typeof rawBody === 'string',
          new ConnectorError(
            ConnectorErrorCodes.InvalidResponse,
            `Invalid response raw body type: ${typeof rawBody}`
          )
        );

        throw new ConnectorError(ConnectorErrorCodes.General, rawBody);
      }

      throw error;
    }
  };

const createLocalSmsConnector: CreateConnector<SmsConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Sms,
    configGuard: localSmsConfigGuard,
    sendMessage: sendMessage(getConfig),
  };
};

export default createLocalSmsConnector;
