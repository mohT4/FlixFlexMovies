const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const AppError = require('../utils/AppError');
const Favorites = require('./favorties');

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: [true, 'this Email is already in use'],
    },
    password: {
      type: String,
      select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    Favorites: {
      type: mongoose.Schema.ObjectId,
      ref: 'Favorites',
    },
  },

  { timestamps: true }
);

userSchema.virtual('passwordConfirmation').set(function (value) {
  this._passwordConfirmation = value;
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const userObject = {
    name: this.name,
    email: this.email,
    password: this.password,
    passwordConfirmation: this._passwordConfirmation,
  };

  const Schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
    passwordConfirmation: joi
      .string()
      .valid(joi.ref('password'))
      .required()
      .messages({ 'any.only': 'password do not match' }),
  });

  await Schema.validateAsync(userObject);
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (currentPD, candiatePD) {
  return await bcrypt.compare(currentPD, candiatePD);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > JWTTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
