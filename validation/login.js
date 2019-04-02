const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLogin(data) {
  let errors = {};

  // convert to strings if empty so that validator can check it
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
