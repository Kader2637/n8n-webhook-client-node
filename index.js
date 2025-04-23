const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/send-webhook', async (req, res) => {
  const { message, callback } = req.body;  // Mengambil data pesan dan callback dari body

  if (!message || !callback) {
    return res.status(400).json({ error: 'Message and callback are required' });
  }

  try {
    // Payload untuk mengirimkan data ke webhook n8n
    const payload = {
      message: message,  // Pesan dinamis dari input
      callback: callback, // URL callback yang dinamis
    };

    const response = await axios.post('https://n8n.avataralabs.ai/webhook/test-webhook', payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Webhook response:', response.data);

    res.status(200).json({
      message: 'Webhook berhasil dikirim dan callback diterima.',
      callbackResponse: response.data,  // Menyimpan respons dari webhook n8n
    });
  } catch (error) {
    console.error('Error sending webhook:', error);
    res.status(500).json({ error: 'Failed to send webhook or callback' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
