const axios = require('axios');
const logger = require('../utils/logger');

const whoisService = {
  // Fetch WHOIS data using external API
  async fetchWhoisData(domain) {
    try {
      // Using a placeholder WHOIS API - replace with actual API
      const apiUrl = `https://api.whoisjson.com/v1/${domain}`;
      const apiKey = process.env.WHOIS_API_KEY;
      
      if (!apiKey) {
        // Fallback to basic WHOIS data if no API key
        return await this.getBasicWhoisData(domain);
      }
      
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 10000
      });
      
      if (response.data && response.data.status === 'success') {
        return this.formatWhoisData(response.data);
      } else {
        throw new Error('Invalid response from WHOIS API');
      }
    } catch (error) {
      logger.error(`Error fetching WHOIS data for ${domain}: ${error.message}`);
      // Fallback to basic WHOIS data
      return await this.getBasicWhoisData(domain);
    }
  },
  
  // Basic WHOIS data extraction (fallback method)
  async getBasicWhoisData(domain) {
    try {
      // This is a simplified implementation
      // In production, you'd use a proper WHOIS library or service
      return {
        domain: domain,
        registrar: 'Unknown',
        creationDate: 'Unknown',
        expiryDate: 'Unknown',
        updatedDate: 'Unknown',
        nameServers: [],
        status: 'Unknown',
        registrant: {
          name: 'Unknown',
          organization: 'Unknown',
          country: 'Unknown'
        }
      };
    } catch (error) {
      logger.error(`Error getting basic WHOIS data for ${domain}: ${error.message}`);
      throw error;
    }
  },
  
  // Format WHOIS data into a consistent structure
  formatWhoisData(rawData) {
    return {
      domain: rawData.domain || 'Unknown',
      registrar: rawData.registrar || 'Unknown',
      creationDate: rawData.creation_date || 'Unknown',
      expiryDate: rawData.expiry_date || 'Unknown',
      updatedDate: rawData.updated_date || 'Unknown',
      nameServers: rawData.name_servers || [],
      status: rawData.status || 'Unknown',
      registrant: {
        name: rawData.registrant_name || 'Unknown',
        organization: rawData.registrant_organization || 'Unknown',
        country: rawData.registrant_country || 'Unknown'
      }
    };
  }
};

module.exports = whoisService;
