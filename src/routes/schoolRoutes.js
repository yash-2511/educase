const express = require('express');
const schoolController = require('../controllers/schoolController');
const { validateSchoolData, validateLocationParams } = require('../middleware/validation');

const router = express.Router();

// School routes
router.post('/addSchool', validateSchoolData, schoolController.addSchool);
router.get('/listSchools', validateLocationParams, schoolController.listSchools);

module.exports = router;