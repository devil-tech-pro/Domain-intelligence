const db = require('../config/database');

class Report {
  // Create a new report
  static async create(reportData) {
    const query = `
      INSERT INTO reports (domain, report_data, created_at, updated_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const values = [
      reportData.domain,
      JSON.stringify(reportData.reportData),
      new Date(),
      new Date()
    ];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to create report: ${error.message}`);
    }
  }
  
  // Find a report by ID
  static async findById(id) {
    const query = 'SELECT * FROM reports WHERE id = $1';
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to find report: ${error.message}`);
    }
  }
  
  // Get all reports
  static async getAll() {
    const query = 'SELECT * FROM reports ORDER BY created_at DESC';
    
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to get reports: ${error.message}`);
    }
  }
  
  // Delete a report
  static async delete(id) {
    const query = 'DELETE FROM reports WHERE id = $1 RETURNING *';
    
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to delete report: ${error.message}`);
    }
  }
}

module.exports = Report;
