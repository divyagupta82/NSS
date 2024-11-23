const express = require('express');
const router = express.Router();
const {signupController, loginController, logout, reqController} = require('../controllers/userController')
const passport = require('passport');
const storeReturnTo = require('../middleware/storeReturnTo ');
const upload = require('../middleware/multer'); 


router.post('/signup',signupController );

router.post('/login', storeReturnTo, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), loginController);


router.post('/requests',upload.single('image'), reqController);


router.get('/logout', logout);





module.exports = router;