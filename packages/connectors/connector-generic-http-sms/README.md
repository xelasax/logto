# Generic HTTP SMS Connector

Welcome to the **Generic HTTP SMS Connector** for Logto — your bridge to any third-party SMS service!

With just a simple HTTP endpoint, you can connect Logto to virtually any SMS provider that supports a web-based API.

---

## 🚀 Overview

This connector is **fully customizable**.

Whenever Logto needs to send an SMS—such as:

- A registration verification code
- A sign-in OTP
- A password reset code
- A one-time OTP for custom flows
- Any generic notification

…it will call the HTTP endpoint you configure.

Your endpoint is responsible for delivering the message to the recipient’s phone.

---

## ⚙️ Configuration

When setting up the connector in the Logto Admin Console, you’ll configure:

| **Field** | **Description** |
| --- | --- |
| **Endpoint** | The full URL of your SMS provider’s send API. Example: `https://api.your-sms-provider.com/send`. |
| **Method** | HTTP method (`GET` or `POST`) your API expects. |
| **Authorization** *(optional)* | API key or token for your provider. Added as `Authorization` header. |
| **Headers** *(optional)* | Additional headers (e.g., `Content-Type: application/json`). |
| **Query Parameters** *(optional)* | Key-value pairs appended to the URL for `GET` requests. |
| **Body Parameters** *(optional)* | JSON payload for `POST` requests. |
| **Templates** *(optional, default provided)* | Message templates for each `usageType` (see below). |

---

## 📝 Templates

Templates define the message content for different scenarios.

You can use **handlebars-style placeholders** (e.g., `{{message}}`) that Logto will replace at runtime.

### Default templates

If you don’t provide your own, the connector includes these:

```json
[
    { "usageType": "Register", "content": "Register code: {{message}}" },
    { "usageType": "SignIn", "content": "Sign in code: {{message}}" },
    { "usageType": "ForgotPassword", "content": "Reset code: {{message}}" },
    { "usageType": "Generic", "content": "{{message}}" },
    { "usageType": "OTP", "content": "Your one-time code is: {{message}}" }
]
```

**Available `usageType` values:**

- `Register`
- `SignIn`
- `ForgotPassword`
- `Generic`
- `OTP` *(custom extension)*

---

## Dynamic Placeholders

These placeholders are replaced by actual values when a message is sent:

| **Placeholder** | **Description** |
| --- | --- |
| `{{to}}` | Recipient phone number with country code. |
| `{{type}}` | Message usage type (e.g., `SignIn`, `Register`, `OTP`). |
| `{{message}}` | The message body (such as a verification code). |

---

## 📦 Example Configurations

### POST request example

```json
{
  "endpoint": "https://api.your-sms-provider.com/send",
  "method": "POST",
  "headers": { "Content-Type": "application/json" },
  "bodyParams": {
    "to": "{{to}}",
    "text": "{{message}}"
  }
}
```

### GET request example

```json
{
  "endpoint": "https://api.your-sms-provider.com/send",
  "method": "GET",
  "queryParams": {
    "to": "{{to}}",
    "message": "{{message}}"
  }
}
```

---

## **Developer Integration Guide**

This section explains **how Logto populates placeholders** and how your connector processes them.

1. **Logto triggers a send**
    
    When a user action requires an SMS, Logto creates a payload:
    
    ```json
    {
      "to": "+1234567890",
      "type": "OTP",
      "message": "123456"
    }
    
    ```
    
2. **Selecting the correct template**
    
    ```tsx
    const template = templates.find(t => t.usageType === type);
    
    ```
    
3. **Replacing placeholders**
    
    ```tsx
    import { replaceSendMessageHandlebars } from '@logto/connector-kit';
    
    const finalMessage = replaceSendMessageHandlebars(template.content, {
      to: payload.to,
      type: payload.type,
      message: payload.message
    });
    ```
    
4. **Sending to your provider**
    
    The processed message is inserted into your configured `bodyParams` or `queryParams`, then sent to your provider.
    

---

## Process Flow Diagram

```
mathematica
CopyEdit
┌────────────┐
│   User     │
│ (Sign In)  │
└─────┬──────┘
      │
      ▼
┌──────────────┐
│    Logto     │
│  (Triggers   │
│ SendMessage) │
└─────┬────────┘
      │
      ▼
┌────────────────────┐
│ Generic HTTP SMS    │
│ Connector           │
│ - Select template   │
│ - Replace {{...}}   │
└─────┬───────────────┘
      │
      ▼
┌────────────────────┐
│ Your SMS Provider   │
│ API Endpoint        │
│ (e.g., Twilio)      │
└─────┬───────────────┘
      │
      ▼
┌────────────┐
│   User's   │
│  Phone 📱  │
└────────────┘

```

---

## Implementation Notes

- `templates` must be an **array** of `{ usageType, content }`.
- You can extend Logto's built-in `TemplateType` enum to include `OTP`.
- Your endpoint must return `2xx` to indicate success.
- Use `replaceSendMessageHandlebars` for placeholder substitution.