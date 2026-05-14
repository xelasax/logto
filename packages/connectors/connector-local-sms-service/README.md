# Local SMS Service connector

The Logto connector for local SMS service with configurable HTTP POST/GET support.

## Overview

This connector allows you to integrate any SMS provider that offers an HTTP API. It supports both GET and POST methods, customizable headers, query parameters, and flexible body formats (JSON or form-urlencoded). This is ideal for:

- Local SMS gateways
- Custom SMS providers
- Any HTTP-based SMS service

## Features

- **Flexible HTTP Methods**: Choose between GET or POST
- **Configurable Headers**: Add custom headers for authentication or other requirements
- **Query Parameters**: For GET requests or additional URL parameters
- **Multiple Body Formats**: Support for JSON and form-urlencoded request bodies
- **Template System**: Pre-defined templates for various use cases (SignIn, Register, ForgotPassword, etc.)
- **Custom Success Codes**: Define which HTTP status codes indicate success

## Configuration

### Basic Setup

1. In the Logto Console, navigate to **Connector** > **SMS**
2. Select **Local SMS Service** from the list
3. Configure the following settings:

#### Required Fields

- **Endpoint URL**: The API endpoint of your SMS service (e.g., `https://your-provider.com/api/send`)

#### Optional Fields

- **HTTP Method**: `GET` or `POST` (default: `POST`)
- **Headers**: JSON object of HTTP headers
  ```json
  {
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
  }
  ```
- **Query Parameters**: JSON object of query string parameters
  ```json
  {
    "api_key": "your-api-key",
    "version": "v1"
  }
  ```
- **Body Parameters (Form)**: For `application/x-www-form-urlencoded` requests
- **Body (JSON)**: JSON body template for POST requests
- **Success Response Codes**: Array of HTTP status codes that indicate success (default: `[200, 201, 202]`)

#### Templates

Define SMS message templates for different use cases. Available variables:
- `{{code}}` - The verification code
- `{{phone}}` - The recipient phone number

Default templates include:
- SignIn
- Register
- ForgotPassword
- Generic
- OrganizationInvitation
- UserPermissionValidation
- BindNewIdentifier
- MfaVerification
- BindMfa

## Request Examples

### POST with JSON Body

Configuration:
```json
{
  "endpoint": "https://api.example.com/sms",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer token123",
    "Content-Type": "application/json"
  },
  "bodyJson": {
    "to": "{{phone}}",
    "message": "{{content}}",
    "sender": "MyApp"
  }
}
```

Sent request:
```json
{
  "to": "+1234567890",
  "message": "Your verification code is 123456",
  "sender": "MyApp"
}
```

### POST with Form Data

Configuration:
```json
{
  "endpoint": "https://api.example.com/sms",
  "method": "POST",
  "bodyParams": {
    "recipient": "{{phone}}",
    "text": "{{content}}",
    "api_key": "key123"
  }
}
```

Sent request (Content-Type: application/x-www-form-urlencoded):
```
recipient=+1234567890&text=Your+verification+code+is+123456&api_key=key123
```

### GET with Query Parameters

Configuration:
```json
{
  "endpoint": "https://api.example.com/send",
  "method": "GET",
  "queryParams": {
    "api_key": "key123",
    "to": "{{phone}}",
    "msg": "{{content}}"
  }
}
```

Sent request:
```
GET https://api.example.com/send?api_key=key123&to=%2B1234567890&msg=Your%20verification%20code%20is%20123456
```

## Template Variables

In templates and body configurations, you can use these placeholders:

- `{{phone}}` - The full phone number (including country code)
- `{{code}}` - The generated verification code
- `{{content}}` - The fully rendered template message (with code substituted)

## Error Handling

The connector will throw errors for:
- Missing required configuration
- Failed HTTP requests
- Non-success HTTP status codes (outside of configured successResponseCodes)
- Template not found for the given type

## Testing

After configuration, use the **Test** button in the Console to verify your SMS service connectivity. The connector will send a test message using the SignIn template.

## Troubleshooting

### "Failed to send SMS" error
- Verify your endpoint URL is correct and accessible
- Check that authentication credentials are valid
- Ensure your SMS provider account is active
- Review the configured headers and parameters

### Template rendering issues
- Ensure your templates include `{{code}}` placeholder
- Check that template usageType matches the intended use case

### HTTP method mismatch
- Confirm your SMS provider expects GET or POST
- Adjust the `method` configuration accordingly

## Support

For issues with this connector, please:
1. Check your SMS provider's API documentation
2. Verify all configuration values
3. Enable debug logging in your SMS provider
4. Open an issue in the [Logto repository](https://github.com/logto-io/logto)
