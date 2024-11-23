const User = require('../models/User')
const Request = require('../models/helpReq');
const uploadOnCloudinary = require('../utils/cloudnary');


module.exports.signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login after signup failed' });
            }
            // Send a success message or user data back to the client
            return res.status(200).json({ message: 'Signup successful', user: registeredUser });
        });
    } catch (e) {
        res.status(400).json({ message: 'Signup failed', error: e.message });
    }
};



module.exports.loginController = (req, res) => {
    
    const redirectUrl = req.session.returnTo || '/';
    // Clear the returnTo field from session
    delete req.session.returnTo;
    // Send the success response along with the redirect URL
    res.status(200).json({ success: 'Login successful', redirectUrl });
};


module.exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed." });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  };
  

  module.exports.reqController = async (req, res) => {
    try {
      const localFilePath = req.file.path;
      const uploadResult = await uploadOnCloudinary(localFilePath);
  
      if (!uploadResult) return res.status(500).json({ error: "Image upload failed" });
  
      const newReq = new Request({
        name: req.body.name,
        regno: req.body.regno,
        email: req.body.email,
        img: uploadResult.url,
        description: req.body.description,
        phnno: req.body.phone,
        typeOfHelp: req.body.helpType,
      });
  
      const savedRequest = await newReq.save();
      // console.log("Data saved:", savedRequest);
  
      // Send the response back to the frontend with the saved request data
      return res.status(200).json(savedRequest);
  
    } catch (error) {
      console.error("Error in sending Request:", error);
      return res.status(500).json({ error: "Error in sending Request" });
    }
  };
  