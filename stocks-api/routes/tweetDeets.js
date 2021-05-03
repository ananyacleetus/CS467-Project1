var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // router.get('/allTweets')
  res.send('ello m8');
});

module.exports = router;
