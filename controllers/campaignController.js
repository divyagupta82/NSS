const Campaign = require("../models/Campaign");
const uploadOnCloudinary = require('../utils/cloudnary');

// Campaign post by admin with img upload (post req)
const createCampaign = async (req, res) => {
   
    try {
      const localFilePath = req.file.path; // Uploaded file path
      const uploadResult = await uploadOnCloudinary(localFilePath);
  
      if (!uploadResult) return res.status(500).json({ error: "Image upload failed" });
  
      // Create new campaign with Cloudinary image URL
      const newCampaign = new Campaign({
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        image: uploadResult.url, // Cloudinary URL
        description: req.body.description,
        target: req.body.target,
        raised: req.body.raised || 0,   
        progress: req.body.progress || 0,
      });
  
      const result = await newCampaign.save();
      // console.log("data saved" + " " + result)
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error creating campaign" });
    }
  }


// getCampaign 
  const getCampaign = async (req, res) => {
    const data = await Campaign.find({});
    res.send(data);
  }
module.exports = { createCampaign, getCampaign };
