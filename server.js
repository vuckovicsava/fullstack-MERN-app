const express = require('express');
const mongoose = require('mongoose');

const app = express();

// database connection
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('database connection successful'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('djasflkasjf'));

const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Server running on port ${port}`));
