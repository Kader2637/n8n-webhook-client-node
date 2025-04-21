const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Memuat variabel lingkungan dari .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware untuk meng-handle request body dalam format JSON
app.use(express.json());

// Route untuk menerima request webhook
app.post('/send-webhook', async (req, res) => {
  const webhookUrl = process.env.WEBHOOK_URL;  // URL webhook yang akan dituju

  try {
    const response = await axios.post(webhookUrl, req.body);  // Mengirim data ke webhook
    res.status(200).json({ message: 'Webhook sent successfully', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send webhook', error: error.message });
  }
});

// Route untuk callback dari n8n (callback URL)
app.post('/callback', (req, res) => {
  console.log('Callback received:', req.body);  // Log data yang diterima
  res.status(200).json({ message: 'Hello Again!' });
});

// Mulai server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
