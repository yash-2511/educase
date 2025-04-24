const Joi = require('joi');

/**
 * Validate school data for the addSchool endpoint
 */
const validateSchoolData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required()
      .messages({
        'string.empty': 'School name is required',
        'string.min': 'School name must be at least 2 characters long',
        'string.max': 'School name cannot exceed 255 characters'
      }),
    address: Joi.string().min(5).max(255).required()
      .messages({
        'string.empty': 'School address is required',
        'string.min': 'School address must be at least 5 characters long',
        'string.max': 'School address cannot exceed 255 characters'
      }),
    latitude: Joi.number().min(-90).max(90).required()
      .messages({
        'number.base': 'Latitude must be a number',
        'number.min': 'Latitude must be between -90 and 90',
        'number.max': 'Latitude must be between -90 and 90'
      }),
    longitude: Joi.number().min(-180).max(180).required()
      .messages({
        'number.base': 'Longitude must be a number',
        'number.min': 'Longitude must be between -180 and 180',
        'number.max': 'Longitude must be between -180 and 180'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

/**
 * Validate location parameters for the listSchools endpoint
 */
const validateLocationParams = (req, res, next) => {
  const schema = Joi.object({
    latitude: Joi.number().min(-90).max(90).required()
      .messages({
        'number.base': 'Latitude must be a number',
        'number.min': 'Latitude must be between -90 and 90',
        'number.max': 'Latitude must be between -90 and 90',
        'any.required': 'Latitude is required'
      }),
    longitude: Joi.number().min(-180).max(180).required()
      .messages({
        'number.base': 'Longitude must be a number',
        'number.min': 'Longitude must be between -180 and 180',
        'number.max': 'Longitude must be between -180 and 180',
        'any.required': 'Longitude is required'
      })
  });

  const { error } = schema.validate(req.query);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

module.exports = {
  validateSchoolData,
  validateLocationParams
};