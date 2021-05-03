const { values } = require("core-js/fn/object");
var express = require("express");
var router = express.Router();

var Sentiment = require('sentiment');
var fs = require('fs');

const qs = require('querystring');
const request = require('request');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const util = require('util');

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const consumer_key = 'Wtbexnbfuuh9SxOT0ovh0I10F'; // Add your API key here
const consumer_secret = 'n1z32lV4OkWQJvyQkaXKQVBOZSkMoGMoiC6vWgthQo4YSSFK8g'; // Add your API secret key here

const requestTokenURL = new URL('https://api.twitter.com/oauth/request_token');
const accessTokenURL = new URL('https://api.twitter.com/oauth/access_token');
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const endpointURL = new URL('https://api.twitter.com/2/users/44196397/tweets');

// variable for parameters to send to request, changed per page on line 
var params = {
    "max_results": 100,
    "tweet.fields": "public_metrics"
};

// full tweets
var all_tweets = [];

// async function input(prompt) {
//     return new Promise(async (resolve, reject) => {
//         readline.question(prompt, (out) => {
//             readline.close();
//             resolve(out);
//         });
//     });
// }

// async function accessToken({ oauth_token, oauth_token_secret }, verifier) {
//     const oAuthConfig = {
//         consumer_key: consumer_key,
//         consumer_secret: consumer_secret,
//         token: oauth_token,
//         token_secret: oauth_token_secret,
//         verifier: verifier,
//     };

//     const req = await post({ url: accessTokenURL, oauth: oAuthConfig });
//     if (req.body) {
//         return qs.parse(req.body);
//     } else {
//         throw new Error('Cannot get an OAuth request token');
//     }
// }

// async function requestToken() {
//     const oAuthConfig = {
//         callback: 'oob',
//         consumer_key: consumer_key,
//         consumer_secret: consumer_secret,
//     };

//     const req = await post({ url: requestTokenURL, oauth: oAuthConfig });
//     if (req.body) {
//         return qs.parse(req.body);
//     } else {
//         throw new Error('Cannot get an OAuth request token');
//     }
// }

async function getRequest() {//{ oauth_token, oauth_token_secret }) {
    const oAuthConfig = {
        consumer_key: 'Wtbexnbfuuh9SxOT0ovh0I10F',
        consumer_secret: 'n1z32lV4OkWQJvyQkaXKQVBOZSkMoGMoiC6vWgthQo4YSSFK8g',
        token: '858750263192035328-z0QCDQpnFu5AreopkCS2QcdRmqol1UY',
        token_secret: 'G0qVNTGFDrdOzVKxSs9qlMzq4zjQNDOEXXyi6r1SVWtqo',
    };

    const req = await get({ url: endpointURL, oauth: oAuthConfig, qs: params, json: true });
    if (req.body) {
        return req.body;
    } else {
        throw new Error('Cannot get an OAuth request token');
    }
}


async function getAllTweets() {

    // if (next_token != undefined && next_token != "") {
    //     // set next parameters

    // }

    try {

        // Get request token
        // const oAuthRequestToken = await requestToken();

        // // Get authorization
        // authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
        // console.log('Please go here and authorize:', authorizeURL.href);
        // const pin = await input('Paste the PIN here: ');

        // Get the access token
        // const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());

        var next_token = "";
        while (next_token != undefined) {
            if (next_token != "") {
                params = {
                    "max_results": 100,
                    "tweet.fields": "public_metrics",
                    "pagination_token": next_token,
                };
            }

            // Make the request
            const response = await getRequest();
            var res_data = response.data

            console.log("full response")
            console.log(response)

            console.log("data")
            console.log(res_data)

            // add sentiment analysis to each data item in res_data
            for (var i = 0; i < res_data.length; i++) {
                var s = new Sentiment();
                res_data[i].sentiment = s.analyze(res_data[i].text).comparative
                const jsonString = JSON.stringify(res_data[i])
                fs.appendFile('tweets.json', jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } 
                    else {
                        console.log("successfully wrote to file")
                    //     console.log(res_data[i])
                    //     console.log(jsonString)
                    }
                })
            }

            // all_tweets = all_tweets.concat(res_data);

            // console.log("this is the 1st response")
            // console.log(res_data)

            // get pagination_token to access next page of tweets
            next_token = response.meta.next_token;
        }
        // return next_token;
        // var result = res_data
        // while (next_token != undefined) {




        //     const response2 = await getRequest(oAuthAccessToken);
        //     const res_data2 = response2.data

        //     console.log(response2.meta)
        //     if (res_data2 == undefined) break;
        //     // add sentiment analysis
        //     for (var i = 0; i < res_data2.length; i++) {
        //         var s = new Sentiment();
        //         res_data2[i].sentiment = s.analyze(res_data2[i].text)
        //     }
        //     // console.log("2nd: ")
        //     // console.log(response2)

        //     result = (result).concat(res_data2);
        //     next_token = response2.meta.next_token;
        //     // console.log("both")
        //     // console.log(t)
        //     // return t;
        // }

        // return result;
    } catch (e) {
        console.error(e);
        process.exit(-1);
    }
    console.log("made it to the end lol")
    process.exit();
}



router.get("/", function (req, res, next) {
    getAllTweets().then(next_token => console.log(next_token))

});

module.exports = router;