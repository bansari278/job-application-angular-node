require('dotenv').config(); 
const mongoose = require('mongoose');
const User = require('../user/user.model'); 
const bcrypt = require('bcrypt');

require('../../../app'); 

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const seedAdminUser = async () => {
  const admin = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'Securepassword@123',
    role: 'admin',
  };

  const existingAdmin = await User.findOne({ email: admin.email });

  if (!existingAdmin) {
    admin.password = await hashPassword(admin.password);
    await User.create(admin);
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  mongoose.connection.close(); 
};

seedAdminUser().catch((err) => console.error(err));

