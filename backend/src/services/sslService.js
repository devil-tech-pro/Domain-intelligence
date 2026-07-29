const https = require('https');
const tls = require('tls');
const logger = require('../utils/logger');

const sslService = {
  // Fetch SSL certificate information for a domain
  async fetchSslInfo(domain) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          hostname: domain,
          port: 443,
          servername: domain,
          rejectUnauthorized: false // We're just getting info, not verifying
        };
        
        const socket = tls.connect(options, () => {
          const cert = socket.getPeerCertificate(true);
          const cipher = socket.getCipher();
          
          if (!cert || Object.keys(cert).length === 0) {
            socket.destroy();
            return resolve({
              domain,
              valid: false,
              error: 'No SSL certificate found'
            });
          }
          
          const sslInfo = {
            domain,
            valid: socket.authorized || true, // We're not verifying, just checking existence
            issuer: {
              name: cert.issuer.CN || 'Unknown',
              organization: cert.issuer.O || 'Unknown',
              country: cert.issuer.C || 'Unknown'
            },
            subject: {
              name: cert.subject.CN || 'Unknown',
              organization: cert.subject.O || 'Unknown',
              country: cert.subject.C || 'Unknown'
            },
            validity: {
              notBefore: cert.valid_from,
              notAfter: cert.valid_to,
              daysRemaining: this.calculateDaysRemaining(cert.valid_to)
            },
            protocol: socket.getProtocol(),
            cipher: {
              name: cipher.name,
              version: cipher.version
            },
            serialNumber: cert.serialNumber,
            fingerprint: cert.fingerprint,
            signatureAlgorithm: cert.sigalg,
            keyAlgorithm: cert.pubkey.type,
            keySize: cert.pubkey.bits || 'Unknown'
          };
          
          socket.destroy();
          resolve(sslInfo);
        });
        
        socket.on('error', (error) => {
          logger.error(`SSL connection error for ${domain}: ${error.message}`);
          resolve({
            domain,
            valid: false,
            error: error.message
          });
        });
        
        socket.setTimeout(10000, () => {
          socket.destroy();
          reject(new Error('SSL connection timeout'));
        });
      } catch (error) {
        logger.error(`Error fetching SSL info for ${domain}: ${error.message}`);
        reject(error);
      }
    });
  },
  
  // Calculate days remaining until certificate expires
  calculateDaysRemaining(notAfter) {
    try {
      const expiryDate = new Date(notAfter);
      const currentDate = new Date();
      const timeDifference = expiryDate - currentDate;
      const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return daysRemaining;
    } catch (error) {
      return 'Unknown';
    }
  }
};

module.exports = sslService;
