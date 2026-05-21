import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorConfigFormItemType } from '@logto/connector-kit';

export const defaultMetadata: ConnectorMetadata = {
  id: 'local-sms-service',
  target: 'local-sms',
  platform: null,
  name: {
    en: 'Local SMS Service',
    'zh-CN': '本地短信服务',
    'tr-TR': 'Yerel SMS Servisi',
    ko: '로컬 SMS 서비스',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Configurable HTTP SMS service with support for GET and POST methods.',
    'zh-CN': '支持 GET 和 POST 方法的可配置 HTTP 短信服务。',
    'tr-TR': 'GET ve POST yöntemlerini destekleyen yapılandırılabilir HTTP SMS hizmeti.',
    ko: 'GET 및 POST 메서드를 지원하는 구성 가능한 HTTP SMS 서비스.',
  },
  readme: './README.md',
  formItems: [
    {
      key: 'endpoint',
      label: 'Endpoint URL',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: 'https://your-sms-provider.com/api/send',
    },
    {
      key: 'method',
      label: 'HTTP Method',
      type: ConnectorConfigFormItemType.Select,
      required: false,
      defaultValue: 'POST',
      selectItems: [
        { value: 'POST', title: 'POST' },
        { value: 'GET', title: 'GET' },
      ],
    },
    {
      key: 'headers',
      label: 'Headers',
      type: ConnectorConfigFormItemType.Json,
      required: false,
      placeholder: '{"Authorization": "Bearer token", "Content-Type": "application/json"}',
      description: 'HTTP headers as JSON object',
    },
    {
      key: 'queryParams',
      label: 'Query Parameters',
      type: ConnectorConfigFormItemType.Json,
      required: false,
      placeholder: '{"api_key": "your-api-key"}',
      description: 'Query parameters for GET requests or to append to URL',
    },
    {
      key: 'bodyParams',
      label: 'Body Parameters (Form)',
      type: ConnectorConfigFormItemType.Json,
      required: false,
      placeholder: '{"key": "value"}',
      description: 'Body parameters for application/x-www-form-urlencoded requests',
    },
    {
      key: 'bodyJson',
      label: 'Body (JSON)',
      type: ConnectorConfigFormItemType.Json,
      required: false,
      placeholder: '{"to": "{{phone}}", "message": "{{content}}"}',
      description:
        'JSON body for POST requests. Use {{phone}}, {{content}}, {{code}} for template variables',
    },
    {
      key: 'successResponseCodes',
      label: 'Success Response Codes',
      type: ConnectorConfigFormItemType.Json,
      required: false,
      defaultValue: [200, 201, 202],
      description: 'HTTP status codes considered successful',
    },
    {
      key: 'templates',
      label: 'Templates',
      type: ConnectorConfigFormItemType.Json,
      required: true,
      defaultValue: [
        {
          usageType: 'SignIn',
          content:
            'Your Logto sign-in verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'Register',
          content:
            'Your Logto sign-up verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'ForgotPassword',
          content:
            'Your Logto password reset verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'Generic',
          content:
            'Your Logto verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'OrganizationInvitation',
          content:
            'Your Logto organization invitation code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'UserPermissionValidation',
          content:
            'Your Logto permission validation code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'BindNewIdentifier',
          content:
            'Your Logto new identifier binding code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'MfaVerification',
          content:
            'Your Logto MFA verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'BindMfa',
          content:
            'Your Logto 2-step verification setup code is {{code}}. The code will remain active for 10 minutes.',
        },
      ],
    },
  ],
};
