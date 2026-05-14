import type { LocalSmsConfig } from './types.js';

export const mockedConfig: LocalSmsConfig = {
  endpoint: 'https://api.example.com/send-sms',
  method: 'POST',
  headers: {
    Authorization: 'Bearer test-token',
    'Content-Type': 'application/json',
  },
  queryParams: {
    api_key: 'test-api-key',
  },
  bodyJson: {
    recipient: '{{phone}}',
    message: '{{content}}',
  },
  templates: [
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
  ],
};
