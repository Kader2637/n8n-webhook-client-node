// api/send-webhook.js
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.post(
      'https://n8n.avataralabs.ai/webhook/test-webhook',
      {
        message: req.body.message || "Halo, n8n",
        callback: `${process.env.VERCEL_URL}/callback`
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    res.json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};