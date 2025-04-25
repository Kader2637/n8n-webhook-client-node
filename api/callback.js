const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const jsonResponse = JSON.stringify({ message: `Data yang diterima: ${body}` });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(jsonResponse);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint tidak ditemukan' }));
    }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client terhubung');

    ws.on('message', (message) => {
        console.log(`Pesan diterima: ${message}`);
        
        const jsonResponse = JSON.stringify({ message: `Data yang diterima: ${message}` });
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(jsonResponse);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client terputus');
    });
});

server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});