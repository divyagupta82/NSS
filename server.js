const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const campaignRoutes = require('./Routes/campaignRoutes');
const userRoutes = require('./Routes/userRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const Campaign = require('./models/Campaign');
var methodOverride = require('method-override')
const User = require('./models/User');
const cors = require('cors'); 
require('dotenv').config();
const Admin = require('./models/Admin');

const session=require('express-session');
const passport=require("passport");
const LocalStrategy=require("passport-local");

const app = express();
const PORT = process.env.PORT||5000;
const mongoURL=process.env.MONGODB_URI|| "mongodb+srv://221fa04507:KLZpx34OitBkGRhl@cluster0.aubau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect(mongoURL).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error));

  const store = MongoStore.create({
    mongoUrl:mongoURL,
    crypto: {
      secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
  });
  
  store.on('error', (err) => {
    console.log("error in mongo session store", err);
  })

  //to use session 
const sessionOptions={
  store,
  secret:"mysupersecretstring",
  resave:false,
  saveUninitialized:true,
  cookie:{
      httpOnly:true,
      expires:Date.now()+(1000*60*60*24*7),
      maxAge:1000*60*60*24*7,
      }, 

};



app.use(session(sessionOptions));

//using passport for authentication after session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//for admin authentication
passport.use('admin-local', Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Routes
app.use('/api', campaignRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
