const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegister(data) {
  let errors = {};

  // convert to strings if empty so that validator can check it
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characteers';
  }
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  // email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is requried';
  }

  // password
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters long';
  }

  // confirm password
  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords don't match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
