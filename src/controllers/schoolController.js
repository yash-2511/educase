const schoolModel = require('../models/schoolModel');
const { calculateDistance } = require('../utils/distanceCalculator');

/**
 * Add a new school to the database
 */
const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    // Add school to database
    const result = await schoolModel.createSchool({
      name,
      address,
      latitude,
      longitude
    });
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * List all schools sorted by proximity to user location
 */
const listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    
    // Convert to numbers
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    
    // Get all schools
    const schools = await schoolModel.getAllSchools();
    
    // Calculate distance for each school and sort by distance
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        school.latitude, 
        school.longitude
      );
      
      return {
        ...school,
        distance // in kilometers
      };
    });
    
    // Sort by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      count: schoolsWithDistance.length,
      data: schoolsWithDistance
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSchool,
  listSchools
};