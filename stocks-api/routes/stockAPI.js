const { values } = require("core-js/fn/object");
var express = require("express");
const { quote } = require("yahoo-finance");
var router = express.Router();
var yahooFinance = require("yahoo-finance")

var d = new Date();
var max = new Date("June 29, 2010");

var toStr = d.toISOString().slice(0,10);
var fromStr = "";

/*
    http://localhost:9000/stockAPI/1mo - last month of stock data
    http://localhost:9000/stockAPI/1yr - last year of stock data
    http://localhost:9000/stockAPI/3yr - last 3 years of stock data
    http://localhost:9000/stockAPI/all - total history of stock data
*/
router.param("timescale", (req, res, next, id) => {
    console.log("yoohoo");
    console.log(id);
    var datetime = new Date();
    switch(id) {
        case "1mo":
            datetime.setMonth(datetime.getMonth() - 3)
            fromStr = datetime.toISOString().slice(0,10);
            break;
        case "1yr":
            datetime.setFullYear(datetime.getFullYear() - 1)
            fromStr = datetime.toISOString().slice(0,10);
            break;
        case "3yr":
            datetime.setFullYear(datetime.getFullYear() - 1)
            break;
        case "all":
            fromStr = max.toISOString().slice(0,10);
            break;
        default:
            console.log("uh oh stinky")
    }
    next();
})
        
router.get("/:timescale", function(req, res, next) {
    console.log(toStr);
    console.log(fromStr);
    yahooFinance.historical({
        symbol: 'TSLA',
        from: fromStr,
        to: toStr,
        // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        }).then(function (quotes) {
        if (quotes[0]) {
            res.send(quotes);
        } else {
            console.log('N/A');
        }
        });
})




;

module.exports = router;