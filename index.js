const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Callback</title>
            </head>
            <body>
                <h1>Silahkan gunakan <a href="https://n8n-webhook-client-node.vercel.app/api/callback">https://n8n-webhook-client-node.vercel.app/api/callback</a> untuk mendapatkan callback</h1>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});