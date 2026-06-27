/**
 * Simple JavaScript Database Module
 * GitHub Repository: https://github.com/jamialwasi23/IDK
 * 
 * A lightweight in-memory database system with basic CRUD operations
 */

class Database {
  constructor(repositoryUrl = 'https://github.com/jamialwasi23/IDK') {
    this.data = {};
    this.repositoryUrl = repositoryUrl;
    this.tables = new Map();
    this.metadata = {
      created: new Date(),
      repo: repositoryUrl,
      version: '1.0.0'
    };
  }

  /**
   * Create a new table
   */
  createTable(tableName, schema = {}) {
    if (this.tables.has(tableName)) {
      throw new Error(`Table "${tableName}" already exists`);
    }
    this.tables.set(tableName, {
      name: tableName,
      schema: schema,
      records: [],
      createdAt: new Date()
    });
    return `Table "${tableName}" created successfully`;
  }

  /**
   * Insert a record into a table
   */
  insert(tableName, record) {
    if (!this.tables.has(tableName)) {
      throw new Error(`Table "${tableName}" does not exist`);
    }
    const table = this.tables.get(tableName);
    const newRecord = {
      id: Date.now() + Math.random(),
      ...record,
      createdAt: new Date()
    };
    table.records.push(newRecord);
    return newRecord;
  }

  /**
   * Find all records in a table
   */
  findAll(tableName) {
    if (!this.tables.has(tableName)) {
      throw new Error(`Table "${tableName}" does not exist`);
    }
    return this.tables.get(tableName).records;
  }

  /**
   * Find records by condition
   */
  find(tableName, condition) {
    if (!this.tables.has(tableName)) {
      throw new Error(`Table "${tableName}" does not exist`);
    }
    const table = this.tables.get(tableName);
    return table.records.filter(record => {
      for (let key in condition) {
        if (record[key] !== condition[key]) return false;
      }
      return true;
    });
  }

  /**
   * Update records
   */
  update(tableName, condition, updateData) {
    if (!this.tables.has(tableName)) {
      throw new Error(`Table "${tableName}" does not exist`);
    }
    const table = this.tables.get(tableName);
    let updatedCount = 0;
    
    table.records = table.records.map(record => {
      let matches = true;
      for (let key in condition) {
        if (record[key] !== condition[key]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        updatedCount++;
        return { ...record, ...updateData, updatedAt: new Date() };
      }
      return record;
    });
    return { message: `${updatedCount} record(s) updated` };
  }

  /**
   * Delete records
   */
  delete(tableName, condition) {
    if (!this.tables.has(tableName)) {
      throw new Error(`Table "${tableName}" does not exist`);
    }
    const table = this.tables.get(tableName);
    const initialLength = table.records.length;
    
    table.records = table.records.filter(record => {
      for (let key in condition) {
        if (record[key] === condition[key]) return false;
      }
      return true;
    });
    
    const deletedCount = initialLength - table.records.length;
    return { message: `${deletedCount} record(s) deleted` };
  }

  /**
   * Get database statistics
   */
  getStats() {
    const stats = {
      repository: this.repositoryUrl,
      databaseCreated: this.metadata.created,
      totalTables: this.tables.size,
      tables: {}
    };

    this.tables.forEach((table, tableName) => {
      stats.tables[tableName] = {
        recordCount: table.records.length,
        createdAt: table.createdAt
      };
    });

    return stats;
  }

  /**
   * Get GitHub repository info
   */
  getRepositoryInfo() {
    return {
      name: 'IDK',
      owner: 'jamialwasi23',
      url: this.repositoryUrl,
      linkedDatabase: true
    };
  }

  /**
   * Export database as JSON
   */
  export() {
    const exportData = {
      metadata: this.metadata,
      tables: {}
    };

    this.tables.forEach((table, tableName) => {
      exportData.tables[tableName] = table;
    });

    return exportData;
  }

  /**
   * Clear entire database
   */
  clear() {
    this.tables.clear();
    return 'Database cleared';
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Database;
}

