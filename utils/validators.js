const { body } = require('express-validator')
const User = require("../models/user");

exports.registerValidators = [
  body('email', 'Type correct email')
    .isEmail().custom(async (value, {req}) => {
    try{
      const user = await User.findOne({ email: value});
      if (user) {
        return Promise.reject(' User with this email already exist')
      }
    } catch (e) {
      console.log(e)
    }
  })
    .normalizeEmail(),
  body('password', 'Password must be from  6 to 8 symbols' )
    .isLength({min: 6, max: 10 })
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, {req}) => {
    if ( value !== req.body.password) {
      throw new Error('password and confirm password must match')
    }
    return true
    })
    .trim(),
  body('name','Name must includes min 3 symbols')
    .isLength({min: 3})
    .trim()
]

exports.courseValidators = [
  body('title', 'Title must be min 3 characters').isLength({min: 3}),
  body('price', 'Insert correct price').isNumeric(),
  body('url','Insert correct url for message')
]
