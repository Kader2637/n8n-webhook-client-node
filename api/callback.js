const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

app.post('/api/callback', (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Raw Body:', req.body);
  
  // Validasi basic
  if (!req.body) {
      console.log('Tidak ada body diterima');
      return res.status(400).send('Bad Request');
  }

  res.json({ 
      status: 'received',
      your_message: req.body.message 
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Terjadi kesalahan internal' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server callback berjalan di http://localhost:${PORT}`);
    console.log(`🔔 Endpoint: http://localhost:${PORT}/api/callback`);
    console.log('Menunggu callback dari n8n webhook...\n');
});