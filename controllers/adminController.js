const { a } = require('framer-motion/m');
const Request = require('../models/helpReq');


module.exports.get_req = async(req, res) => {
    const result = await Request.find({});
    // console.log(result);
    return res.status(200).json(result);
};

module.exports.delete_req = async (req, res) => {
    const { id } = req.params;
   
  
    try {
      const result = await Request.findByIdAndDelete(id);
      if (result) {
        res.status(200).json({ message: "Request deleted successfully." });
      } else {
        res.status(404).json({ message: "Request not found." });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete request.", error });
    }
  };