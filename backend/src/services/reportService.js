const Report = require('../models/Report');
const logger = require('../utils/logger');

const reportService = {
  // Save a domain intelligence report
  async saveReport(domain, reportData) {
    try {
      const report = await Report.create({
        domain,
        reportData
      });
      
      logger.info(`Report saved for domain: ${domain}`);
      return report;
    } catch (error) {
      logger.error(`Error saving report: ${error.message}`);
      throw error;
    }
  },
  
  // Get all saved reports
  async getReports() {
    try {
      const reports = await Report.getAll();
      return reports;
    } catch (error) {
      logger.error(`Error getting reports: ${error.message}`);
      throw error;
    }
  },
  
  // Export a report as PDF
  async exportReportAsPdf(reportId) {
    try {
      const report = await Report.findById(reportId);
      
      if (!report) {
        throw new Error('Report not found');
      }
      
      // This would use a PDF generation library like Puppeteer
      // For now, we'll return a placeholder
      const pdfContent = `Domain Intelligence Report for ${report.domain}`;
      
      return Buffer.from(pdfContent);
    } catch (error) {
      logger.error(`Error exporting report: ${error.message}`);
      throw error;
    }
  }
};

module.exports = reportService;
