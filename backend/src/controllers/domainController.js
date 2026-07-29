const domainService = require('../services/domainService');
const logger = require('../utils/logger');

const domainController = {
  // Analyze complete domain information
  analyzeDomain: async (req, res) => {
    try {
      const { domain } = req.params;
      
      // Validate domain
      if (!domain || !domain.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid domain format'
        });
      }
      
      logger.info(`Analyzing domain: ${domain}`);
      
      // Get all domain information
      const whoisInfo = await domainService.getWhoisInfo(domain);
      const dnsRecords = await domainService.getDnsRecords(domain);
      const sslInfo = await domainService.getSslInfo(domain);
      const hostingInfo = await domainService.getHostingInfo(domain);
      
      // Combine all information
      const domainIntelligence = {
        domain,
        whois: whoisInfo,
        dns: dnsRecords,
        ssl: sslInfo,
        hosting: hostingInfo,
        analyzedAt: new Date().toISOString()
      };
      
      res.status(200).json({
        success: true,
        data: domainIntelligence
      });
    } catch (error) {
      logger.error(`Error analyzing domain ${req.params.domain}: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to analyze domain'
      });
    }
  },
  
  // Get WHOIS information only
  getWhoisInfo: async (req, res) => {
    try {
      const { domain } = req.params;
      logger.info(`Getting WHOIS info for: ${domain}`);
      
      const whoisInfo = await domainService.getWhoisInfo(domain);
      
      res.status(200).json({
        success: true,
        data: whoisInfo
      });
    } catch (error) {
      logger.error(`Error getting WHOIS info for ${req.params.domain}: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to get WHOIS information'
      });
    }
  },
  
  // Get DNS records only
  getDnsRecords: async (req, res) => {
    try {
      const { domain } = req.params;
      logger.info(`Getting DNS records for: ${domain}`);
      
      const dnsRecords = await domainService.getDnsRecords(domain);
      
      res.status(200).json({
        success: true,
        data: dnsRecords
      });
    } catch (error) {
      logger.error(`Error getting DNS records for ${req.params.domain}: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to get DNS records'
      });
    }
  },
  
  // Get SSL certificate information only
  getSslInfo: async (req, res) => {
    try {
      const { domain } = req.params;
      logger.info(`Getting SSL info for: ${domain}`);
      
      const sslInfo = await domainService.getSslInfo(domain);
      
      res.status(200).json({
        success: true,
        data: sslInfo
      });
    } catch (error) {
      logger.error(`Error getting SSL info for ${req.params.domain}: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to get SSL certificate information'
      });
    }
  }
};

module.exports = domainController;
