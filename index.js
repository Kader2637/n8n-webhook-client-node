export default function handler(req, res) {
  try {
    // Hanya izinkan POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Pastikan Content-Type JSON
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(400).json({ error: 'Invalid Content-Type. Must be application/json' });
    }

    // Cek apakah body punya 'message'
    if (!req.body || !req.body.message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    console.log('✅ Callback received:', req.body);

    res.status(200).json({
      status: 'received',
      data: req.body
    });

  } catch (error) {
    console.error('❌ Error handling callback:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
}
