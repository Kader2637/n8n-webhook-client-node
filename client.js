const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function sendWebhook() {
  try {
    const response = await axios.post(process.env.WEBHOOK_URL, {
      message: 'Hello, n8n',
      callback: process.env.CALLBACK_URL,
    });
    console.log('Webhook sent:', response.data);
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}

sendWebhook();
