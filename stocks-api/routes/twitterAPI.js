const { values } = require("core-js/fn/object");
var express = require("express");
var router = express.Router();

// adding twit library 
const Twit = require('twit')


const apiKey = 'icbfq7v4ttaUhxrh2wOjJAh25'
const secretKey = 'KCA4UmCnzQy9uroN83RKzOtcgMzoajs358u8xNjowtUcr5AjKB'
const accessToken = '1365776346216099854-usHRXSkhH2djE7NiF4ahMxamSLMvVF'
const secretToken = 'Is2oqRNWX3Alr8IUsggNfNLikyNvqJCyhtKvEeAbDLuT3'

var T = new Twit({
    consumer_key:         apiKey,
    consumer_secret:      secretKey,
    access_token:         accessToken,
    access_token_secret:  secretToken,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  });




  var options = { screen_name: 'elonmusk',
  count: 3 };



router.get("/", function(req, res, next){
    T.get('statuses/user_timeline', options , function(err, data) {
        for (var i = 0; i < data.length ; i++) {
            console.log(data[i].text);
          }
      })
      
      
    //   .then(function(result) {
    //     console.log("I am watching you")
    //     res.send(result)
    //   });
        

});

module.exports = router;