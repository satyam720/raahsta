import crypto from 'crypto';
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: [8, 'Password must contain at least 8 characters'],
    select: false
  },
  passwordConfirm: {
    // this only works on save and create
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function () {
  // only run this function if password was actually modified
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.pre('save', function(){
  if(!this.isModified('password') ||  this.isNew){
    return;
  }

  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.pre(/^find/, function(){
  //this points to find query
  this.find({ active: {$ne: false} });
})

// instance method:
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  // candidate password is normal password
  // userPassword is hashed
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  
  if(this.passwordChangedAt){
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
    return JWTTimestamp < changedTimeStamp;
  }

  // false means not changed
  return false;
}

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
}

const User = mongoose.model('User', userSchema);
export default User;
