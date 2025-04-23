export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Panggilan callback diterima:', req.body);
    res.status(200).json({ message: 'Callback diterima' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
