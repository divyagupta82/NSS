const Request = require('../models/Request');

// Get all pending requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'pending' });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};
