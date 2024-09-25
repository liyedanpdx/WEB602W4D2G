const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello, secure world!');
}).listen(443, () => {
    console.log('HTTPS server running on https://localhost/');
});