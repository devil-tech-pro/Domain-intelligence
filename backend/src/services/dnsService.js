const dns = require('dns').promises;
const logger = require('../utils/logger');

const dnsService = {
  // Fetch DNS records for a domain
  async fetchDnsRecords(domain) {
    try {
      const dnsRecords = {
        A: [],
        AAAA: [],
        MX: [],
        TXT: [],
        NS: [],
        CNAME: [],
        SOA: null
      };
      
      // A records
      try {
        const aRecords = await dns.resolve4(domain);
        dnsRecords.A = aRecords.map(record => ({
          type: 'A',
          value: record,
          ttl: 300 // Default TTL
        }));
      } catch (error) {
        logger.debug(`No A records found for ${domain}`);
      }
      
      // AAAA records
      try {
        const aaaaRecords = await dns.resolve6(domain);
        dnsRecords.AAAA = aaaaRecords.map(record => ({
          type: 'AAAA',
          value: record,
          ttl: 300 // Default TTL
        }));
      } catch (error) {
        logger.debug(`No AAAA records found for ${domain}`);
      }
      
      // MX records
      try {
        const mxRecords = await dns.resolveMx(domain);
        dnsRecords.MX = mxRecords.map(record => ({
          type: 'MX',
          value: `${record.priority} ${record.exchange}`,
          priority: record.priority,
          exchange: record.exchange,
          ttl: 300 // Default TTL
        }));
      } catch (error) {
        logger.debug(`No MX records found for ${domain}`);
      }
      
      // TXT records
      try {
        const txtRecords = await dns.resolveTxt(domain);
        dnsRecords.TXT = txtRecords.map(record => ({
          type: 'TXT',
          value: Array.isArray(record) ? record.join('') : record,
          ttl: 300 // Default TTL
        }));
      } catch (error) {
        logger.debug(`No TXT records found for ${domain}`);
      }
      
      // NS records
      try {
        const nsRecords = await dns.resolveNs(domain);
        dnsRecords.NS = nsRecords.map(record => ({
          type: 'NS',
          value: record,
          ttl: 300 // Default TTL
        }));
      } catch (error) {
        logger.debug(`No NS records found for ${domain}`);
      }
      
      // CNAME record
      try {
        const cnameRecord = await dns.resolveCname(domain);
        dnsRecords.CNAME = [{
          type: 'CNAME',
          value: cnameRecord,
          ttl: 300 // Default TTL
        }];
      } catch (error) {
        logger.debug(`No CNAME record found for ${domain}`);
      }
      
      // SOA record
      try {
        const soaRecord = await dns.resolveSoa(domain);
        dnsRecords.SOA = {
          type: 'SOA',
          value: `${soaRecord.nsname} ${soaRecord.hostmaster} ${soaRecord.serial} ${soaRecord.refresh} ${soaRecord.retry} ${soaRecord.expire} ${soaRecord.minttl}`,
          nsname: soaRecord.nsname,
          hostmaster: soaRecord.hostmaster,
          serial: soaRecord.serial,
          refresh: soaRecord.refresh,
          retry: soaRecord.retry,
          expire: soaRecord.expire,
          minttl: soaRecord.minttl,
          ttl: 300 // Default TTL
        };
      } catch (error) {
        logger.debug(`No SOA record found for ${domain}`);
      }
      
      return dnsRecords;
    } catch (error) {
      logger.error(`Error fetching DNS records for ${domain}: ${error.message}`);
      throw error;
    }
  }
};

module.exports = dnsService;
