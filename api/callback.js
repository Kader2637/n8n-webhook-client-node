const http = require('http');

const PORT = process.env.PORT || 3000;

const requestHandler = (req, res) => {
    processRequest(req, (responseMessage) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(responseMessage);
    });
};

const processRequest = (req, callback) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString(); 
    });

    req.on('end', () => {
        callback(`Data yang diterima: ${body}`);
    });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});