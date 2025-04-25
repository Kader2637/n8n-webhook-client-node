const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

// Membuat server HTTP
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>WebSocket Example</title>
        </head>
        <body>
            <h1>Data yang diterima:</h1>
            <pre id="data"></pre>
            <script>
                const ws = new WebSocket('ws://' + window.location.host);
                ws.onmessage = function(event) {
                    document.getElementById('data').textContent += event.data + '\\n';
                };
            </script>
        </body>
        </html>
    `);
});

// Membuat WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client terhubung');

    ws.on('message', (message) => {
        console.log(`Pesan diterima: ${message}`);
        // Kirim kembali pesan ke semua klien
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Data yang diterima: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client terputus');
    });
});

// Menjalankan server
server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});