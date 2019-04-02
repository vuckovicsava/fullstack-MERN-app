const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const passportConfig = require('./config/passport');
const userRoutes = require('./routes/api/user');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/post');

// initialize express app
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
passportConfig(passport);

// database connection
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('database connection successful'))
  .catch(err => console.log(err));

// routes
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);

// start the server
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Server running on port ${port}`));
