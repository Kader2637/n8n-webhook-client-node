// api/index.js
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('n8n Webhook Client - Gunakan POST /send-webhook untuk mengirim data');
};