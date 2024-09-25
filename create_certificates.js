const forge = require('node-forge');
const fs = require('fs');

function generateCertificate() {
  // Generate a new key pair
  const keys = forge.pki.rsa.generateKeyPair(2048);

  // Create a certificate
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [{
    name: 'commonName',
    value: 'paradxlyd.com'
  }, {
    name: 'countryName',
    value: 'US'
  }, {
    shortName: 'ST',
    value: 'Missouri'
  }, {
    name: 'localityName',
    value: 'St.louis'
  }, {
    name: 'organizationName',
    value: 'Paradxlyd'
  }, {
    shortName: 'OU',
    value: 'Unit'
  }];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  // Self-sign the certificate
  cert.sign(keys.privateKey);

  // Convert to PEM format
  const pem = {
    private: forge.pki.privateKeyToPem(keys.privateKey),
    cert: forge.pki.certificateToPem(cert)
  };

  // Write the certificate and private key to files
  fs.writeFileSync('certificate.pem', pem.cert);
  fs.writeFileSync('private-key.pem', pem.private);

  console.log('Self-signed certificate generated successfully.');
}

generateCertificate();