const mysql = require('mysql2/promise');

// Database connection pool
let pool;

/**
 * Creates a connection pool to the MySQL database
 */
const connectToDatabase = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'school_management',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    
    // Create table if it doesn't exist
    await initializeDatabase(connection);
    
    connection.release();
    
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

/**
 * Initialize database with required tables
 */
const initializeDatabase = async (connection) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await connection.query(createTableQuery);
    console.log('Schools table initialized');
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
    throw error;
  }
};

/**
 * Execute a SQL query
 */
const query = async (sql, params) => {
  try {
    if (!pool) await connectToDatabase();
    const [results] = await pool.query(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
  query
};