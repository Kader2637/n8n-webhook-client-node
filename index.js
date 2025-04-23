const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint untuk menerima callback dari n8n webhook
app.post('/callback', (req, res) => {
  const { message } = req.body; // Mengambil pesan dari response yang dikirim oleh n8n

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log('Callback received:', message);

  // Menanggapi dengan pesan yang dikirim oleh n8n (bisa diubah sesuai kebutuhan)
  res.json({
    message: `Hello Again! Received your message: ${message}`,
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
