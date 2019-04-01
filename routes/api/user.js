const router = require('express').Router();

router.get('/', (req, res) =>
  res.json({
    msg: 'Users response'
  })
);

module.exports = router;
