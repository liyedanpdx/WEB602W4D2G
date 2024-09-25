const https = require('https');
const fs = require('fs');

// Read the SSL/TLS certificate files
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

// Create the HTTPS server
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at https://127.0.0.1:${port}/`);
});