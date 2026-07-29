const reportService = require('../services/reportService');
const logger = require('../utils/logger');

const reportController = {
  // Save a domain intelligence report
  saveReport: async (req, res) => {
    try {
      const { domain, reportData } = req.body;
      
      logger.info(`Saving report for domain: ${domain}`);
      
      const report = await reportService.saveReport(domain, reportData);
      
      res.status(201).json({
        success: true,
        data: report
      });
    } catch (error) {
      logger.error(`Error saving report: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to save report'
      });
    }
  },
  
  // Get all saved reports
  getReports: async (req, res) => {
    try {
      logger.info('Getting all reports');
      
      const reports = await reportService.getReports();
      
      res.status(200).json({
        success: true,
        data: reports
      });
    } catch (error) {
      logger.error(`Error getting reports: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to get reports'
      });
    }
  },
  
  // Export a report as PDF
  exportReport: async (req, res) => {
    try {
      const { reportId } = req.params;
      
      logger.info(`Exporting report with ID: ${reportId}`);
      
      const pdfBuffer = await reportService.exportReportAsPdf(reportId);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="domain-report-${reportId}.pdf"`,
        'Content-Length': pdfBuffer.length
      });
      
      res.send(pdfBuffer);
    } catch (error) {
      logger.error(`Error exporting report: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to export report'
      });
    }
  }
};

module.exports = reportController;
