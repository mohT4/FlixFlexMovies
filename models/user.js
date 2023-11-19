const mongoose = require('mongoose');
const joi = require('joi');
const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
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
    _passwordConfirmation: joi
      .string()
      .valid(joi.ref('password'))
      .required()
      .messages({ 'any.only': 'password do not match' }),
  });

  await Schema.validate(userObject);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
