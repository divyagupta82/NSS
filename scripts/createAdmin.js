const mongoose = require('mongoose');
const Admin = require('../models/Admin');

mongoose.connect('mongodb://localhost:27017/NSS', {
  
}).then(async () => {
  const admin = new Admin({ email: 'srilatha@gmail.com' });
  await Admin.register(admin, 'srilatha@123'); // Replace with the desired password
  console.log('Admin created successfully');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error creating admin:', err);
});
