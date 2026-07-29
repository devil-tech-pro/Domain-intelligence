const whoisService = require('./whoisService');
const dnsService = require('./dnsService');
const sslService = require('./sslService');
const redisClient = require('../config/redis');
const logger = require('../utils/logger');

const domainService = {
  // Get WHOIS information for a domain
  async getWhoisInfo(domain) {
    try {
      // Check cache first
      const cacheKey = `whois:${domain}`;
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        logger.info(`WHOIS data for ${domain} found in cache`);
        return JSON.parse(cachedData);
      }
      
      // Get fresh data
      const whoisInfo = await whoisService.fetchWhoisData(domain);
      
      // Cache the result for 24 hours
      await redisClient.setex(cacheKey, 86400, JSON.stringify(whoisInfo));
      
      return whoisInfo;
    } catch (error) {
      logger.error(`Error getting WHOIS info for ${domain}: ${error.message}`);
      throw error;
    }
  },
  
  // Get DNS records for a domain
  async getDnsRecords(domain) {
    try {
      // Check cache first
      const cacheKey = `dns:${domain}`;
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        logger.info(`DNS records for ${domain} found in cache`);
        return JSON.parse(cachedData);
      }
      
      // Get fresh data
      const dnsRecords = await dnsService.fetchDnsRecords(domain);
      
      // Cache the result for 6 hours
      await redisClient.setex(cacheKey, 21600, JSON.stringify(dnsRecords));
      
      return dnsRecords;
    } catch (error) {
      logger.error(`Error getting DNS records for ${domain}: ${error.message}`);
      throw error;
    }
  },
  
  // Get SSL certificate information for a domain
  async getSslInfo(domain) {
    try {
      // Check cache first
      const cacheKey = `ssl:${domain}`;
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        logger.info(`SSL info for ${domain} found in cache`);
        return JSON.parse(cachedData);
      }
      
      // Get fresh data
      const sslInfo = await sslService.fetchSslInfo(domain);
      
      // Cache the result for 1 hour
      await redisClient.setex(cacheKey, 3600, JSON.stringify(sslInfo));
      
      return sslInfo;
    } catch (error) {
      logger.error(`Error getting SSL info for ${domain}: ${error.message}`);
      throw error;
    }
  },
  
  // Get hosting information for a domain
  async getHostingInfo(domain) {
    try {
      // This would typically involve IP lookup services
      // For now, we'll return a placeholder implementation
      return {
        hostingProvider: 'Unknown',
        ip: 'Unknown',
        asn: 'Unknown',
        location: 'Unknown'
      };
    } catch (error) {
      logger.error(`Error getting hosting info for ${domain}: ${error.message}`);
      throw error;
    }
  }
};

module.exports = domainService;
