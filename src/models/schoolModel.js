const { query } = require('../config/database');

/**
 * Create a new school record
 */
const createSchool = async (schoolData) => {
  const { name, address, latitude, longitude } = schoolData;
  
  const sql = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;
  
  return await query(sql, [name, address, latitude, longitude]);
};

/**
 * Get all schools from the database
 */
const getAllSchools = async () => {
  const sql = 'SELECT * FROM schools';
  return await query(sql);
};

/**
 * Get a school by ID
 */
const getSchoolById = async (id) => {
  const sql = 'SELECT * FROM schools WHERE id = ?';
  const result = await query(sql, [id]);
  return result[0];
};

module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById
};