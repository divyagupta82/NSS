const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); 
const { createCampaign, getCampaign } = require('../controllers/campaignController');

router.get('/campaigns', getCampaign);
router.post('/campaigns', upload.single('image'),createCampaign );

module.exports = router;
