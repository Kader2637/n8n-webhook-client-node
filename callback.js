const express = require('express');
const app = express();

// Gunakan process.env.PORT untuk mendapatkan port yang disediakan oleh Vercel atau fallback ke 3000 untuk lokal
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/callback', (req, res) => {
  const { message } = req.body;  // Mendapatkan 'message' dari body request

  if (!message) {
    return res.status(400).json({ error: 'Message is required' }); // Jika tidak ada pesan, return error
  }

  console.log('Callback received:', message);

  // Kirim kembali respons dengan 'message' yang diterima
  res.json({
    message: `Hello Again! Received your message: ${message}`,  // Respons dinamis
  });
});

// Server berjalan pada port yang disediakan oleh Vercel atau port 3000 untuk lokal
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
