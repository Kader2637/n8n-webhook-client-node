require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Endpoint utama - FIXED
app.get('/', (req, res) => {
  res.send('n8n Webhook Client - Gunakan POST /send-webhook untuk mengirim data');
});

// Endpoint untuk mengirim webhook - FIXED
app.post('/send-webhook', async (req, res) => {
  try {
    const callbackUrl = process.env.VERCEL_URL 
      ? `${process.env.VERCEL_URL}/callback`
      : `${req.protocol}://${req.get('host')}/callback`;
    
    const payload = {
      message: req.body.message || "Halo, n8n",
      callback: callbackUrl
    };

    const response = await axios.post(
      'https://n8n.avataralabs.ai/webhook/test-webhook',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    res.json({
      status: 'success',
      data: response.data,
      callbackUrl: callbackUrl
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Endpoint callback - FIXED
app.post('/callback', (req, res) => {
  console.log('Callback received:', req.body);
  res.json({ status: 'callback received', data: req.body });
});

module.exports = app;