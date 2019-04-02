const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // input validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const { name, email, password } = req.body;
      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const { id, name, email } = user;
          const payload = {
            id,
            name,
            email
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          return res.status(400).json({ password: 'Password Incorrect' });
        }
      });
    })
    .catch(err => console.log(err));
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
