const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Endpoint untuk mengirim data ke n8n webhook
app.post('/send-webhook', async (req, res) => {
  const { message, callback } = req.body;

  if (!message || !callback) {
    return res.status(400).json({ error: 'Message dan callback harus disertakan' });
  }

  try {
    const webhookUrl = 'https://n8n.avataralabs.ai/webhook/test-webhook';

    const response = await axios.post(webhookUrl, {
      message,
      callback,
    });

    return res.json({
      message: 'Webhook berhasil dikirim.',
      response: response.data,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Gagal mengirim webhook', detail: error.message });
  }
});

// Endpoint callback yang akan dipanggil oleh n8n
app.post('/callback', (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
  
    console.log('Pesan callback diterima:', message);
  
    res.json({
      message: `Hello Again! Pesanmu: ${message}`,
    });
  });
  
// Untuk lokal dan Vercel
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
  });
} else {
  module.exports = app;
}
