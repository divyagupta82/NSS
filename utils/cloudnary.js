const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

// Configuring Cloudinary with environment variables
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;  // If file path is invalid

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // // File uploaded successfully
        // console.log("File is uploaded to Cloudinary:", response.url);
        return response;

    } catch (err) {
        console.error("Error uploading to Cloudinary:", err);
        
        // Removing the file from disk using fs.unlinkSync (for synchronous behavior)
        try {
            fs.unlinkSync(localFilePath);
            console.log("Local file removed after upload failure");
        } catch (unlinkErr) {
            console.error("Error removing file:", unlinkErr);
        }
        
        return null; // Return null to indicate failure
    }
};

module.exports = uploadOnCloudinary;