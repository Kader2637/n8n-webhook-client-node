const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Untuk parsing JSON body

// Endpoint untuk menerima POST request
app.post('/send-webhook', async (req, res) => {
  const webhookUrl = process.env.WEBHOOK_URL;  // URL webhook yang akan dituju

  console.log('Request received at /send-webhook');
  console.log('Request body:', req.body); // Log body request untuk debugging

  try {
    const response = await axios.post(webhookUrl, req.body);
    res.status(200).json({ message: 'Webhook sent successfully', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send webhook', error: error.message });
  }
});

// Server berjalan pada port yang ditentukan
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
