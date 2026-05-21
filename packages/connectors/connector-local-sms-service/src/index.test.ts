import nock from 'nock';

import { TemplateType } from '@logto/connector-kit';
import { vi, describe, it, expect, afterEach } from 'vitest';

import createConnector from './index.js';
import { mockedConfig } from './mock.js';

const getConfig = vi.fn().mockResolvedValue(mockedConfig);

describe('Local SMS Service connector', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should init without throwing errors', async () => {
    await expect(createConnector({ getConfig })).resolves.not.toThrow();
  });

  it('should send POST request with JSON body by default', async () => {
    const url = new URL(mockedConfig.endpoint);
    const mockPost = nock(url.origin)
      .post(url.pathname, (body) => {
        expect(body).toMatchObject({
          recipient: '+1234567890',
          message:
            'Your Logto sign-in verification code is 123456. The code will remain active for 10 minutes.',
        });
        return true;
      })
      .query({ api_key: 'test-api-key' })
      .reply(200, { success: true });

    const connector = await createConnector({ getConfig });
    await connector.sendMessage({
      to: '+1234567890',
      type: TemplateType.SignIn,
      payload: {
        code: '123456',
      },
    });

    expect(mockPost.isDone()).toBe(true);
  });

  it('should send POST request with form-urlencoded body when bodyParams is set', async () => {
    const formConfig = {
      ...mockedConfig,
      bodyParams: {
        to: '{{phone}}',
        message: '{{content}}',
        format: 'text',
      },
      bodyJson: undefined,
    };
    const getFormConfig = vi.fn().mockResolvedValue(formConfig);
    const url = new URL(mockedConfig.endpoint);
    const mockPost = nock(url.origin)
      .post(url.pathname, (body) => {
        const params = new URLSearchParams(body as string);
        expect(params.get('to')).toBe('+1234567890');
        expect(params.get('message')).toBe(
          'Your Logto sign-in verification code is 123456. The code will remain active for 10 minutes.'
        );
        expect(params.get('format')).toBe('text');
        return true;
      })
      .query({ api_key: 'test-api-key' })
      .reply(200, { success: true });

    const connector = await createConnector({ getConfig: getFormConfig });
    await connector.sendMessage({
      to: '+1234567890',
      type: TemplateType.SignIn,
      payload: {
        code: '123456',
      },
    });

    expect(mockPost.isDone()).toBe(true);
  });

  it('should send GET request with query parameters', async () => {
    const getOnlyConfig = {
      endpoint: 'https://api.example.com/send-sms',
      method: 'GET',
      headers: {},
      queryParams: {
        api_key: 'test-api-key',
        to: '{{phone}}',
        message: '{{content}}',
      },
      templates: mockedConfig.templates,
    };
    const getConfigGet = vi.fn().mockResolvedValue(getOnlyConfig);
    const url = new URL(getOnlyConfig.endpoint);
    const mockGet = nock(url.origin)
      .get(url.pathname)
      .query({
        api_key: 'test-api-key',
        to: '+1234567890',
        message:
          'Your Logto sign-in verification code is 123456. The code will remain active for 10 minutes.',
      })
      .reply(200, { success: true });

    const connector = await createConnector({ getConfig: getConfigGet });
    await connector.sendMessage({
      to: '+1234567890',
      type: TemplateType.SignIn,
      payload: {
        code: '123456',
      },
    });

    expect(mockGet.isDone()).toBe(true);
  });

  it('should include custom headers', async () => {
    const url = new URL(mockedConfig.endpoint);
    const mockPost = nock(url.origin, {
      reqheaders: {
        Authorization: 'Bearer test-token',
        'X-Custom-Header': 'custom-value',
      },
    })
      .post(url.pathname)
      .query({ api_key: 'test-api-key' })
      .reply(200, { success: true });

    const customConfig = {
      ...mockedConfig,
      headers: {
        ...mockedConfig.headers,
        'X-Custom-Header': 'custom-value',
      },
    };
    const customGetConfig = vi.fn().mockResolvedValue(customConfig);

    const connector = await createConnector({ getConfig: customGetConfig });
    await connector.sendMessage({
      to: '+1234567890',
      type: TemplateType.SignIn,
      payload: { code: '123456' },
    });

    expect(mockPost.isDone()).toBe(true);
  });

  it('should handle template with different usageType', async () => {
    const url = new URL(mockedConfig.endpoint);
    const mockPost = nock(url.origin)
      .post(url.pathname, (body: unknown) => {
        const bodyObject = body as Record<string, unknown>;
        expect(bodyObject.message).toContain('verification code is 123456');
        return true;
      })
      .query({ api_key: 'test-api-key' })
      .reply(200);

    const connector = await createConnector({ getConfig });
    await connector.sendMessage({
      to: '+1234567890',
      type: TemplateType.ForgotPassword,
      payload: {
        code: '123456',
      },
    });

    expect(mockPost.isDone()).toBe(true);
  });

  it('should fall back to Generic template when specific usageType is not found', async () => {
    const minimalConfig = {
      endpoint: mockedConfig.endpoint,
      method: 'POST',
      headers: {},
      queryParams: {},
      templates: [
        {
          usageType: 'SignIn',
          content: 'SignIn template: {{code}}',
        },
        {
          usageType: 'Register',
          content: 'Register template: {{code}}',
        },
        {
          usageType: 'ForgotPassword',
          content: 'ForgotPassword template: {{code}}',
        },
        {
          usageType: 'Generic',
          content: 'Generic template: {{code}}',
        },
      ],
    };
    const getConfigMinimal = vi.fn().mockResolvedValue(minimalConfig);
    const url = new URL(mockedConfig.endpoint);
    const mockPost = nock(url.origin)
      .post(url.pathname, (body) => {
        expect(body).toMatchObject({
          message: 'Generic template: 123456',
        });
        return true;
      })
      .reply(200);

    const connector = await createConnector({ getConfig: getConfigMinimal });
    await connector.sendMessage({
      to: '+1234567890',
      type: 'OrganizationInvitation' as TemplateType,
      payload: {
        code: '123456',
      },
    });

    expect(mockPost.isDone()).toBe(true);
  });

  it('should throw error on non-2xx response', async () => {
    const url = new URL(mockedConfig.endpoint);
    nock(url.origin)
      .post(url.pathname)
      .query({ api_key: 'test-api-key' })
      .reply(400, { error: 'Bad request' });

    const connector = await createConnector({ getConfig });
    await expect(
      connector.sendMessage({
        to: '+1234567890',
        type: TemplateType.SignIn,
        payload: { code: '123456' },
      })
    ).rejects.toThrow();
  });

  it('should handle custom success response codes', async () => {
    const customConfig = {
      ...mockedConfig,
      successResponseCodes: [200, 204],
    };
    const customGetConfig = vi.fn().mockResolvedValue(customConfig);
    const url = new URL(mockedConfig.endpoint);
    nock(url.origin).post(url.pathname).query({ api_key: 'test-api-key' }).reply(204);

    const connector = await createConnector({ getConfig: customGetConfig });
    await expect(
      connector.sendMessage({
        to: '+1234567890',
        type: TemplateType.SignIn,
        payload: { code: '123456' },
      })
    ).resolves.not.toThrow();
  });
});
