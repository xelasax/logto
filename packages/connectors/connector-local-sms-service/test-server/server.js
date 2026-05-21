const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Store sent messages for inspection
const sentMessages = [];

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'local-sms-mock' });
});

// Mock SMS sending endpoint (supports both GET and POST)
app.all('/send-sms', (req, res) => {
  const method = req.method;
  let messageData;

  if (method === 'GET') {
    // For GET requests, data comes from query params
    messageData = {
      to: req.query.to,
      message: req.query.message,
      ...req.query,
    };
  } else {
    // For POST requests, data comes from body (JSON or form)
    messageData = { ...req.body };
  }

  // Store the message for debugging/review
  sentMessages.push({
    timestamp: new Date().toISOString(),
    method,
    headers: req.headers,
    data: messageData,
  });

  console.log(`📨 SMS received via ${method}:`, JSON.stringify(messageData, null, 2));

  // Simulate SMS sending success (HTTP 200)
  // In a real provider, this would actually send the SMS
  res.status(200).json({
    success: true,
    message: 'SMS sent successfully',
    messageId: `mock-${Date.now()}`,
    to: messageData.to,
    body: messageData.message || messageData.content,
  });
});

// Endpoint to view all sent messages (for debugging)
app.get('/admin/messages', (req, res) => {
  res.json({
    count: sentMessages.length,
    messages: sentMessages,
  });
});

// Clear sent messages
app.delete('/admin/messages', (req, res) => {
  sentMessages.length = 0;
  res.json({ success: true, message: 'Messages cleared' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Mock SMS server listening on port ${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/send-sms`);
  console.log(`🔍 View sent messages: http://localhost:${PORT}/admin/messages`);
});
