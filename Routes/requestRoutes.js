const express = require('express');
const router = express.Router();
const { getPendingRequests } = require('../controllers/requestController');

// Fetch pending campaign requests
router.get('/requests', getPendingRequests);

module.exports = router;
