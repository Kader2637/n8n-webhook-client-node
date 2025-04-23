export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('🔥 Headers:', req.headers);
    console.log('📦 Body:', req.body);

    res.status(200).json({
      status: 'success',
      received: req.body
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
