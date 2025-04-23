const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-webhook', async (req, res) => {
  const { message, callback } = req.body;

  if (!message || !callback) {
    return res.status(400).json({ error: 'Message or Callback is missing' });
  }

  try {
    const webhookUrl = 'https://n8n.avataralabs.ai/webhook/test-webhook';
    const payload = { message, callback };

    const response = await axios.post(webhookUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Response from n8n:', response.data);

    const callbackResponse = await axios.post(callback, {
      message: response.data.message || 'No message from n8n'
    });

    console.log('Response from callback:', callbackResponse.data);

    res.status(200).json({
      message: 'Webhook sent successfully and callback received.',
      callbackResponse: callbackResponse.data,
    });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: 'Failed to send webhook or callback' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
