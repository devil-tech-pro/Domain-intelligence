const express = require('express');
const { body, validationResult } = require('express-validator');
const domainController = require('../controllers/domainController');
const auth = require('../middleware/auth');

const router = express.Router();

// Route to get complete domain intelligence
router.get(
  '/analyze/:domain',
  [
    body('domain').isFQDN().withMessage('Please provide a valid domain name'),
  ],
  domainController.analyzeDomain
);

// Route to get WHOIS information
router.get(
  '/whois/:domain',
  [
    body('domain').isFQDN().withMessage('Please provide a valid domain name'),
  ],
  domainController.getWhoisInfo
);

// Route to get DNS records
router.get(
  '/dns/:domain',
  [
    body('domain').isFQDN().withMessage('Please provide a valid domain name'),
  ],
  domainController.getDnsRecords
);

// Route to get SSL certificate information
router.get(
  '/ssl/:domain',
  [
    body('domain').isFQDN().withMessage('Please provide a valid domain name'),
  ],
  domainController.getSslInfo
);

module.exports = router;
