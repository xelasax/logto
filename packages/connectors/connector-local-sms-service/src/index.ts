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
    return Object.fromEntries(
      Object.entries(value).map(([key, value_]) => [
        key,
        replacePlaceholders(value_, phone, message),
      ])
    );
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
    /* eslint-disable-next-line no-restricted-syntax */
    const finalQueryParams = replacePlaceholders(queryParams, to, message) as Record<
      string,
      string
    >;
    for (const [key, value] of Object.entries(finalQueryParams)) {
      url.searchParams.append(key, String(value));
    }

    // Prepare request options functionally to avoid mutation and reduce complexity
    const getHeaders = (): Record<string, string> => {
      if (headers['Content-Type']) {
        return { ...headers };
      }
      if (method === 'POST') {
        const contentType = bodyParams ? 'application/x-www-form-urlencoded' : 'application/json';
        return { 'Content-Type': contentType, ...headers };
      }
      return { ...headers };
    };

    const getForm = (): Record<string, string> | undefined => {
      if (method === 'POST' && bodyParams) {
        /* eslint-disable-next-line no-restricted-syntax */
        return replacePlaceholders(bodyParams, to, message) as Record<string, string>;
      }
      return undefined;
    };

    const getJson = (): unknown | undefined => {
      if (method === 'POST') {
        if (bodyParams) {
          return undefined;
        }
        if (bodyJson) {
          return replacePlaceholders(bodyJson, to, message);
        }
        return { to, message, ...payload };
      }
      return undefined;
    };

    const requestOptions = {
      headers: getHeaders(),
      ...(getForm() ? { form: getForm() } : {}),
      ...(getJson() ? { json: getJson() } : {}),
    };

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
