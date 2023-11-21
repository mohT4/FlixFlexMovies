const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const sendMail = require('../utils/email');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRESIN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //chack if the email and the password exists
  if (!email || !password) {
    return next(new AppError(400, 'please provide email and password'));
  }

  //check if user exist and password and email are correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password, user.password)))
    return next(new AppError(400, 'wrong email or password'));

  user.password = undefined;
  //send data and token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token: token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) check check token and check if it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    console.error(req.headers);
    return next(
      new AppError(
        401,
        'you are not logged in! Please login first to get access'
      )
    );
  }

  //2) verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET);

  //3) check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError(401, 'user does not exist anymore'));

  //4) if user changed password after jwt was issued
  const changedPassword = freshUser.changedPasswordAfter(decoded.iat);

  if (changedPassword) {
    return next(new AppError(401, 'the user currently changed password'));
  }

  req.user = freshUser;

  next();
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  //check if the user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(401, 'Please enter your email address'));
  }

  // generate the reset password token
  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false });

  //send it to user email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/resetPassword/${resetToken}`;
  const message = `We wanted to let you know that you can change your password at any time to keep your account secure. To reset your password, please click on the following link:
  ${resetURL}`;
  try {
    await sendMail({
      email: user.email,
      subject: 'your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email successfully!',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });
    console.log(error);
    return next(
      new AppError(
        500,
        'there was a problem sending the email. try again later'
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // check if token has expired
  if (!user) {
    return next(
      new AppError(400, 'Token is invalid or has expired. Please try again!')
    );
  }

  //updade password
  user.password = req.body.password;
  user.passwordConfirmation = req.body.passwordConfirmation;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token: token,
    user,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //get user from collection
  const user = await User.findById(req.user.id).select('+password');

  //check if current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('invalid password', 401));
  }
  //id so update password
  user.password = req.body.password;
  user.passwordConfirmation = req.body.passwordConfirmation;
  await user.save();

  //log in, send jwt

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token: token,
    user,
  });
});
