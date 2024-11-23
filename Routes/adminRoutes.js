// adminRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const storeReturnTo = require('../middleware/storeReturnTo ');
const Request = require('../models/helpReq');
const { delete_req, get_req } = require('../controllers/adminController');

const Admin = require('../models/Admin');


router.post('/login', (req, res, next) => {
    // console.log("Admin login attempt with:", req.body);
    passport.authenticate('admin-local', (err, admin, info) => {
      if (err) {
        console.log("Error during authentication:", err);
        return next(err);
      }
      if (!admin) {
        console.log("Admin not found:", info);
        return res.status(400).json({ message: 'Login failed. Admin not found or invalid credentials.' });
      }
  
      req.login(admin, (err) => {
        if (err) return res.status(500).json({ message: 'Login failed during session initiation', err });
        res.status(200).json({ success: 'Login successful', token: "admin-auth-token" }); // You may want to generate a JWT here if needed
      });
    })(req, res, next);
  });
  
  // Admin routes for request handling
  router.get('/get-req', get_req);
  router.delete('/dlt-req/:id', delete_req);
  
  module.exports = router;