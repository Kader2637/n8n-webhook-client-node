// api/callback.js
module.exports = (req, res) => {
    console.log('Callback received:', req.body);
    res.json({ status: 'received', data: req.body });
  };