const db = require('../config/database');

class Domain {
  // Create a new domain record
  static async create(domainData) {
    const query = `
      INSERT INTO domains (domain, created_at, updated_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const values = [
      domainData.domain,
      new Date(),
      new Date()
    ];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to create domain record: ${error.message}`);
    }
  }
  
  // Find a domain by name
  static async findByDomain(domain) {
    const query = 'SELECT * FROM domains WHERE domain = $1';
    
    try {
      const result = await db.query(query, [domain]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to find domain: ${error.message}`);
    }
  }
  
  // Update a domain record
  static async update(id, updateData) {
    const query = `
      UPDATE domains
      SET updated_at = $1
      WHERE id = $2
      RETURNING *
    `;
    
    const values = [
      new Date(),
      id
    ];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to update domain: ${error.message}`);
    }
  }
  
  // Get all domains
  static async getAll() {
    const query = 'SELECT * FROM domains ORDER BY created_at DESC';
    
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to get domains: ${error.message}`);
    }
  }
}

module.exports = Domain;
