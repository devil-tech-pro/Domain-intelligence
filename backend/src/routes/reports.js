const express = require('express');
const { body, validationResult } = require('express-validator');
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

const router = express.Router();

// Route to save a report
router.post(
  '/save',
  [
    body('domain').isFQDN().withMessage('Please provide a valid domain name'),
    body('reportData').not().isEmpty().withMessage('Report data is required'),
  ],
  auth,
  reportController.saveReport
);

// Route to get all reports
router.get('/', auth, reportController.getReports);

// Route to export a report as PDF
router.get(
  '/export/:reportId',
  auth,
  reportController.exportReport
);

module.exports = router;
