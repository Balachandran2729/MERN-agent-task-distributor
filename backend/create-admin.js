const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    // Delete existing users
    await User.deleteMany({});
    
    // Create new admin
    const admin = new User({
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};
createAdmin();