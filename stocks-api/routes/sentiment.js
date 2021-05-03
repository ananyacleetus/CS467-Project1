var express = require('express');
var router = express.Router();
var Sentiment = require('sentiment');

var tweet = "DARR"

router.param("tweet", (req, res, next, id) => {
    tweet = id;
    next();
});

/* GET home page. */
router.get('/:tweet', function(req, res, next) {
  var sentiment = new Sentiment()
  var result = sentiment.analyze(tweet)
  res.json(result)
});

module.exports = router;
