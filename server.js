const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Route untuk menangani callback dari n8n
app.post("/callback", (req, res) => {
  const { message } = req.body;
  console.log("Received callback:", message);
  res.status(200).json({ message: "Callback received!" });
});

// Route untuk mengirim request ke n8n webhook
app.post("/send-webhook", async (req, res) => {
  try {
    const response = await axios.post(process.env.WEBHOOK_URL, {
      message: "Hello, n8n",
      callback: process.env.CALLBACK_URL,
    });
    console.log("Webhook response:", response.data);
    res.status(200).send("Webhook sent successfully!");
  } catch (error) {
    console.error("Error sending webhook:", error);
    res.status(500).send("Error sending webhook");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
