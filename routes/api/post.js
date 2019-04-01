const router = require('express').Router();

router.get('/', (req, res) =>
  res.json({
    msg: 'Post response'
  })
);

module.exports = router;
