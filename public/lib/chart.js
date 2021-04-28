function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import * as d3 from "d3";
import { utcParse } from "d3";
import React, { useState, useEffect } from "react"; // import fs from "fs";
//stylesheet

import "..//css/chart.css";

function Chart(props) {
  var timescale = props.timeScale;
  var stockState = props.stockState; // console.log(props.stockState);

  var stockIds = Object.keys(stockState).filter(i => stockState[i] == true); // console.log(stockIds);
  // Should return month-day-year
  // const dateFormat = d3.timeParse("%d-%b-%y");

  var utcToDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"); // %a - abbrevieated weekday name
  // %b - abbreviated month name
  // - day as number
  // -

  var twitDateFormat = d3.timeParse("%a %b %d %H:%M:%S %Z %Y"); //Should return hourv(12h format) : minute : am/pm

  var timeFormat = d3.timeParse("%I:%M %p");

  var sendDataToSidebar = d => {
    // props.onChangeDate(twitDateFormat(d.created_at).toString());
    props.onChangeDate(utcToDate(d.dateStr).toString());
    props.onChangePrice(d3.format(" $.2f")(d.close).toString());
  };

  var setChangePriceYesterdayDataToSidebar = x => {
    if (x == "N/A") {
      props.onChangePriceYesterday(" No data");
    } else {
      props.onChangePriceYesterday(d3.format(" $.2f")(x).toString());
    }
  };

  var setChangePriceTweetDataToSidebar = y => {
    if (y == "N/A") {
      props.onChangePriceTweet(" No data");
    } else {
      props.onChangePriceTweet(d3.format(" $.2f")(y).toString());
    }
  };

  var sendTweetDataToSidebar = d => {
    props.onChangeTweetID(d.id_str);
  };

  function drawChart() {
    window.addEventListener("load", callAPI());
  }

  function getTwitterData() {
    return _getTwitterData.apply(this, arguments);
  }

  function _getTwitterData() {
    _getTwitterData = _asyncToGenerator(function* () {
      var twit_data = yield fetch("http://localhost:9000/twitterAPI").then(res => res.json()); // sometimes twitter api doesn't send all the data

      console.log(twit_data);
      getStockData(twit_data, timescale, 'tsla');
    });
    return _getTwitterData.apply(this, arguments);
  }

  function getStockData(_x, _x2, _x3) {
    return _getStockData.apply(this, arguments);
  }

  function _getStockData() {
    _getStockData = _asyncToGenerator(function* (twitter_data, timescale, stockSymbols) {
      // const twit_data = twitter_data;
      // var stock_data = await fetch("http://localhost:9000/stockAPI/" + timescale + "/" + stockSym).then(res => res.json())
      var symbols = ['tsla', 'etsy'];
      var waiting = symbols.length; // var allSymbolData = [];
      // var allSymbolPromises = symbols.map((symbol) => {
      //   return new Promise((resolve) => fetch("http://localhost:9000/stockAPI/" + timescale + "/" + symbol, resolve).then(data => {
      //       allSymbolData.push(data)
      //     }).catch(e => console.log(e)));
      // });
      //
      // Promise.all(allSymbolPromises).then(() => processStockData(allSymbolData, twitter_data));

      var allSymbolData = [];
      symbols.forEach(stockSym => {
        fetch("http://localhost:9000/stockAPI/" + timescale + "/" + stockSym).then(res => res.json()).then(data => {
          // processStockData()
          allSymbolData.push(data);
          waiting--;

          if (waiting === 0) {
            processStockData(allSymbolData, twitter_data);
          } // console.log(waiting);

        }).catch(e => console.log(e));
      }); // console.log(allSymbolData);
      // symbols.forEach(stockSym => {
      //   var currStock = fetch("http://localhost:9000/stockAPI/" + timescale + "/" + stockSym).then(res => res.json());
      //     allSymbolData.push(currStock);
      // });
      // while (waiting !== 0) {}
      // processStockData(allSymbolData, twitter_data);
    });
    return _getStockData.apply(this, arguments);
  }

  function processStockData(allStockData, twitter_data) {
    // do whatever with allSymbolData
    console.log(allStockData);
    console.log(allStockData.length); // allSymbolData.forEach(stock_data => {

    for (var i = 0; i < allStockData.length; i++) {
      var stock_data = allStockData[i];
      console.log(stock_data); // find the most "influential" tweet by elon for each day, by retweets and favorites
      // set twit_data[idx].is_max to indicate twit_data[idx] is the most influential of the day
      // so we can only display most influential for now

      var tw = 0;
      console.log(twitter_data.length);

      while (tw < twitter_data.length) {
        var current = twitter_data[tw].date;
        var max_tweets = twitter_data[tw].retweet_count + twitter_data[tw].favorite_count;
        var max_index = tw;
        tw++;

        if (tw >= twitter_data.length) {
          twitter_data[tw - 1].is_max = "true";
          break;
        }

        var next_day = twitter_data[tw].date;

        while (current == next_day) {
          var sum = twitter_data[tw].retweet_count + twitter_data[tw].favorite_count;

          if (sum > max_tweets) {
            max_tweets = sum;
            max_index = tw;
          }

          tw++;

          if (tw >= twitter_data.length) {
            break;
          }

          next_day = twitter_data[tw].date;
        }

        twitter_data[max_index].is_max = "true";
      } // set all dates to make comparisons later easier


      var i = 0;

      for (i = 0; i < Math.max(stock_data.length, twitter_data.length); i++) {
        if (i < stock_data.length) {
          stock_data[i].dateStr = stock_data[i].date;
          stock_data[i].date = utcToDate(stock_data[i].date).setHours(0, 0, 0, 0);
          stock_data[i].twitterPt = "false";
        }

        if (i < twitter_data.length) {
          twitter_data[i].dateStr = twitter_data[i].created_at;
          twitter_data[i].date = twitDateFormat(twitter_data[i].created_at).setHours(0, 0, 0, 0);
          twitter_data[i].is_max = "false";
        }
      } // add price field to objects in twit data based on stock price of that date
      // and add dummy stock points for missing dates
      // var st = 0;
      // console.log("adding price")
      // for (tw = 0; tw < twitter_data.length; tw++) {
      //   var t_date = twitter_data[tw].date;
      //   while (st < stock_data.length) {
      //     var s_date = stock_data[st].date;
      //     if (t_date === s_date) {
      //       twitter_data[tw].close = stock_data[st].close
      //       break;
      //     } else if (t_date < s_date) {
      //       st++;
      //     } else {
      //       // there might not be a stock price for this day
      //       // insert a point in stocks for that day with previous day's stock price
      //       stock_data.splice(st, 0, {date: twitter_data[tw].date, dateStr: stock_data[st].dateStr, close: stock_data[st].close, twitterPt: "true"})
      //       twitter_data[tw].close = stock_data[st].close
      //       break;
      //     }
      //   }
      // }


      console.log("done");
    } // drawLineGraph(stock_data, twitter_data);

  }

  function drawTwitterGraph(twitter_data, date_scale, price_scale) {
    var svg = d3.select("#chart_svg"); //Get the current height and width of the SVG

    var svgwidth = svg.attr("width");
    var svgheight = svg.attr("height");
    var PADDING = {
      TOP: 50,
      RIGHT: 50,
      BOTTOM: 50,
      LEFT: 50
    };
    var maxLinePoint = svgheight - PADDING.BOTTOM;
    var minLinePoint = 0;
    var tooltip = d3.select("#tooltip");

    if (!props.updateScale && !props.updateStocks) {
      svg.selectAll(".twitterData").data(twitter_data).enter() //TWITTER DOTS
      // .append("circle")
      // .filter(function (d) {return d.is_max == "true"})
      // .attr("class", "twitterData")
      // .attr("r", dotSize+2)
      // .attr("cx", function(d) {return dateScale((d.date)); })
      // .attr("cy", function(d) {return priceScale(parseFloat(d.close)); })
      .append("line") //TODO: investigate why this is a breaking change
      // .filter(function (d) {return d.is_max == "true"})
      .attr("class", "twitterData").style("stroke-dasharray", "3, 3").attr('x1', function (d) {
        return date_scale(d.date);
      }).attr('y1', maxLinePoint).attr('x2', function (d) {
        return date_scale(d.date);
      }).attr('y2', minLinePoint).attr("stroke", "#1EA1F2").attr("fill", "#1EA1F2").on("mouseover", (mouseEvent, d) => {
        // Runs when the mouse enters a dot.  d is the corresponding data point.
        tooltip.style("opacity", 1);
        tooltip.text(d.text); //TODO: send twitter id to sidebar and display twitter counts in tooltip

        sendTweetDataToSidebar(d);
      }).on("mousemove", (mouseEvent, d) => {
        /* Runs when mouse moves inside a dot */
        // var leftOffset = d3.pointer(mouseEvent)[0] + 3
        var leftOffset = date_scale(d.date) + 3;
        tooltip.style("left", leftOffset + "px"); // var topOffset = d3.pointer(mouseEvent)[1] + 3

        var topOffset = price_scale(parseFloat(d.close)) + PADDING.TOP + 3;
        tooltip.style("top", topOffset + "px"); //TODO: send twitter id to sidebar and display twitter counts in tooltip
        //sendTweetDataToSidebar(d);
      }).on("mouseout", (mouseEvent, d) => {
        tooltip.style("opacity", 0);
      });
    }

    if (props.updateScale || props.updateStocks) {
      // remove duplicates of data being drawn
      d3.selectAll(".twitterData").remove();
      svg = d3.select("#chart_svg").transition(); // Update tweet dots

      svg.selectAll(".twitterData").duration(1000) // .attr("cx", function(d) {return dateScale((d.date)); })
      // .attr("cy", function(d) { return priceScale(parseFloat(d.close)); });
      .attr('x1', function (d) {
        return dateScale(d.date);
      }).attr('y1', maxLinePoint).attr('x2', function (d) {
        return dateScale(d.date);
      }).attr('y2', minLinePoint);
    }
  }

  function drawStockGraph(stock_data, date_scale, price_scale) {
    var svg = d3.select("#chart_svg"); //Get the current height and width of the SVG

    var svgwidth = svg.attr("width");
    var svgheight = svg.attr("height");
    var PADDING = {
      TOP: 50,
      RIGHT: 50,
      BOTTOM: 50,
      LEFT: 50
    };
    var maxLinePoint = svgheight - PADDING.BOTTOM;
    var minLinePoint = 0;
    var dotSize = 3;
    var tooltip = d3.select("#tooltip");
    var currentline = d3.line().x(function (d) {
      return date_scale(d.date);
    }).y(function (d) {
      return price_scale(parseFloat(d.close));
    });

    if (!props.updateScale && !props.updateStocks) {
      svg.append("path").data([stock_data]).attr("d", currentline).attr("class", "chartLine");
      var stockData = svg.selectAll(".stockData").data(stock_data).enter().append("circle").attr("class", "stockData").attr("r", dotSize).attr("cx", function (d) {
        return date_scale(d.date);
      }).attr("cy", function (d) {
        return price_scale(parseFloat(d.close));
      }).attr("stroke", "#52C11F").attr("fill", "#52C11F").attr("priceChange", function (d, i) {
        if (i != 0 && i + 1 < stock_data.length) {
          var lastPrice = parseFloat(stock_data[i].close);
          var currentPrice = parseFloat(stock_data[i + 1].close);
          return lastPrice - currentPrice;
        }
      }).attr("priceChangeTweet", function (d, i) {
        var tweetFiltered = stock_data.filter(function (d) {
          return d.twitterPt == "true";
        });

        if (i != 0 && i + 1 < stock_data.length) {
          var currentPrice = parseFloat(stock_data[i + 1].close);
          var currentDate = stock_data[i + 1].dateStr;
          var beforePoints = tweetFiltered.filter(function (d) {
            return d.dateStr < currentDate;
          });

          if (beforePoints.length == 0) {
            return "N/A";
          }

          var lastDate = beforePoints[beforePoints.length - 1].dateStr;
          var lastPrice = parseFloat(beforePoints[beforePoints.length - 1].close);

          if (lastPrice - currentPrice < 0) {
            console.log("negative");
          }

          return lastPrice - currentPrice;
        }

        return "N/A";
      });
      stockData.on("mouseover", function (mouseEvent, d, i) {
        // Runs when the mouse enters a dot.  d is the corresponding data point.
        tooltip.style("opacity", 1);
        tooltip.text("The price is " + d3.format(" $.2f")(d.close) + " at " + d.dateStr);
        sendDataToSidebar(d);
        setChangePriceYesterdayDataToSidebar(d3.select(this).attr("priceChange"));
        setChangePriceTweetDataToSidebar(d3.select(this).attr("priceChangeTweet"));
      }).on("mousemove", function (mouseEvent, d, i) {
        /* Runs when mouse moves inside a dot */
        // var leftOffset = d3.pointer(mouseEvent)[0] + 3
        var leftOffset = date_scale(d.date) + 3;
        tooltip.style("left", leftOffset + "px"); // var topOffset = d3.pointer(mouseEvent)[1] + 3

        var topOffset = price_scale(parseFloat(d.close)) + PADDING.TOP + 3;
        tooltip.style("top", topOffset + "px");
        sendDataToSidebar(d);
        setChangePriceYesterdayDataToSidebar(d3.select(this).attr("priceChange"));
        setChangePriceTweetDataToSidebar(d3.select(this).attr("priceChangeTweet"));
      }).on("mouseout", (mouseEvent, d) => {
        tooltip.style("opacity", 0);
      });
    }

    if (props.updateScale || props.updateStocks) {
      // remove duplicates of data being drawn
      d3.selectAll(".chartLine").remove();
      d3.selectAll(".stockData").remove();
      svg = d3.select("#chart_svg").transition(); // Update lines

      svg.selectAll(".chartLine").duration(1000).attr("d", currentline); // Update stock dots

      svg.selectAll(".stockData").duration(1000).attr("cx", function (d) {
        return dateScale(d.date);
      }).attr("cy", function (d) {
        return priceScale(parseFloat(d.close));
      });
    }
  }

  function callAPI() {
    return _callAPI.apply(this, arguments);
  }

  function _callAPI() {
    _callAPI = _asyncToGenerator(function* () {
      getTwitterData();
    });
    return _callAPI.apply(this, arguments);
  }

  function drawLineGraph(stock_data, twitter_data) {
    var PADDING = {
      TOP: 50,
      RIGHT: 50,
      BOTTOM: 50,
      LEFT: 50
    };
    var svg = d3.select("#chart_svg"); //TODO: find min and max of all the stock data sets

    var minDate = d3.min(stock_data, function (d) {
      return d.date;
    });
    var maxDate = d3.max(stock_data, function (d) {
      return d.date;
    });
    var minPrice = d3.min(stock_data, function (d) {
      return parseFloat(d.close);
    });
    var maxPrice = d3.max(stock_data, function (d) {
      return parseFloat(d.close);
    }); //Get the current height and width of the SVG

    var svgwidth = svg.attr("width");
    var svgheight = svg.attr("height"); // const dotSize = 3;

    var dateScale = d3.scaleTime().domain([minDate, maxDate]).range([0 + PADDING.LEFT, svgwidth - PADDING.RIGHT]);
    var priceScale = d3.scaleLinear().domain([0, maxPrice]).range([svgheight - PADDING.TOP, 0 + PADDING.BOTTOM]);
    var yTranslation = svgheight - PADDING.LEFT;
    var xTranslation = 0 + PADDING.TOP;
    var xAxisX = (svgwidth - xTranslation) / 2;
    var xAxisY = svgheight - PADDING.BOTTOM / 3;
    var yAxisX = 0 + PADDING.RIGHT / 3;
    var yAxisY = svgheight - yTranslation / 2;
    var maxLinePoint = svgheight - PADDING.BOTTOM;
    var minLinePoint = 0;
    var tooltip = d3.select("#tooltip");

    if (!props.updateScale && !props.updateStocks) {
      // svg.append("g") creates an SVG <g> element, short for "group."
      // It doesn’t draw anything by itself, but serves to group child elements together.
      svg.append("g").call(d3.axisBottom(dateScale)) // d3 creates a bunch of elements inside the <g>
      .attr("transform", "translate(0, ".concat(yTranslation, ")")).attr("class", "xAxis");
      svg.append("g").call(d3.axisLeft(priceScale)).attr("transform", "translate(".concat(xTranslation, ", 0)")).attr("class", "yAxis");
      svg.append("text").attr("font-size", 14).attr("font-weight", "bold").attr("font-family", "Avenir").attr("x", xAxisX).attr("y", xAxisY).text("Date").attr("class", "xAxisLabel");
      svg.append("text").attr("font-size", 14) // This code duplication signals that these properties
      .attr("font-weight", "bold") // should be moved to CSS. For now, the code is this
      .attr("font-family", "Avenir") // way to simplify our directions to you.
      .attr("transform", "translate(".concat(yAxisX, " ").concat(yAxisY, ") rotate(-90)")).text("Price (USD)").attr("class", "yAxisLabel"); // drawTwitterGraph(twitter_data, dateScale, priceScale);
      // drawStockGraph(stock_data, dateScale, priceScale);
    }

    if (props.updateScale || props.updateStocks) {
      // drawTwitterGraph(twitter_data, dateScale, priceScale);
      // drawStockGraph(stock_data, dateScale, priceScale);
      // remove duplicates of data being drawn
      svg.selectAll(".xAxisLabel").remove();
      svg.selectAll(".yAxisLabel").remove();
      svg.selectAll(".xAxis").remove();
      svg.selectAll(".yAxis").remove();
      svg = d3.select("#chart_svg").transition(); // Update axes and labels

      svg.selectAll(".xAxisLabel").attr("x", xAxisX).attr("y", xAxisY);
      svg.selectAll(".yAxisLabel").attr("transform", "translate(".concat(yAxisX, " ").concat(yAxisY, ") rotate(-90)"));
      svg.selectAll(".xAxis").duration(1000).call(d3.axisBottom(dateScale)) // d3 creates a bunch of elements inside the <g>
      .attr("transform", "translate(0, ".concat(yTranslation, ")"));
      svg.selectAll(".yAxis").duration(1000).call(d3.axisLeft(priceScale)).attr("transform", "translate(".concat(xTranslation, ", 0)"));
      props.onChangeUpdateScale(false);
      props.onChangeUpdateStocks(false);
    }

    drawTwitterGraph(twitter_data, dateScale, priceScale);
    drawStockGraph(stock_data, dateScale, priceScale);
  }

  useEffect(() => {
    drawChart();
  }, [props.updateScale, props.updateStocks]);
  return /*#__PURE__*/React.createElement("div", {
    id: "fullChart"
  }, /*#__PURE__*/React.createElement("div", {
    id: "tooltip",
    className: "tooltip",
    style: {
      "opacity": 0
    }
  }, "Hover over a point to start!"), /*#__PURE__*/React.createElement("svg", {
    id: "chart_svg",
    width: "1000",
    height: "700"
  }));
}

export default Chart;