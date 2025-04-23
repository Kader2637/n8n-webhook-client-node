const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Gunakan port yang disediakan oleh Vercel

app.use(express.json());

app.post('/callback', (req, res) => {
  const { message } = req.body; // Mendapatkan 'message' dari body request

  if (!message) {
    return res.status(400).json({ error: 'Message is required' }); // Jika tidak ada pesan, return error
  }

  console.log('Callback received:', message);

  // Kirim kembali respons dengan 'message' yang diterima
  res.json({
    message: `Hello Again! Received your message: ${message}`,
  });
});

// Server berjalan
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
