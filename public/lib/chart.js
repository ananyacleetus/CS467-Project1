function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import * as d3 from "d3";
import { utcParse } from "d3";
import React, { useState, useEffect } from "react"; // import fs from "fs";
//stylesheet

import "..//css/chart.css";

function Chart(props) {
  var timescale = props.timeScale; // Should return month-day-year
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
    window.addEventListener("load", callAPI(timescale));
    var PADDING = {
      TOP: 50,
      RIGHT: 50,
      BOTTOM: 50,
      LEFT: 50
    };

    function callAPI(_x) {
      return _callAPI.apply(this, arguments);
    }

    function _callAPI() {
      _callAPI = _asyncToGenerator(function* (timescale) {
        var stock_data = yield fetch("http://localhost:9000/stockAPI/" + timescale).then(res => res.json());
        var twit_data = yield fetch("http://localhost:9000/twitterAPI").then(res => res.json()); // sometimes twitter api doesn't send all the data

        console.log(twit_data); // set all dates to make comparisons later easier

        var i = 0;

        for (i = 0; i < Math.max(stock_data.length, twit_data.length); i++) {
          if (i < stock_data.length) {
            stock_data[i].dateStr = stock_data[i].date;
            stock_data[i].date = utcToDate(stock_data[i].date).setHours(0, 0, 0, 0);
            stock_data[i].twitterPt = "false";
          }

          if (i < twit_data.length) {
            twit_data[i].dateStr = twit_data[i].created_at;
            twit_data[i].date = twitDateFormat(twit_data[i].created_at).setHours(0, 0, 0, 0);
            twit_data[i].is_max = "false";
          }
        } // find the most "influential" tweet by elon for each day, by retweets and favorites
        // set twit_data[idx].is_max to indicate twit_data[idx] is the most influential of the day
        // so we can only display most influential for now


        var tw = 0;
        console.log(twit_data.length);

        while (tw < twit_data.length) {
          var current = twit_data[tw].date;
          var max_tweets = twit_data[tw].retweet_count + twit_data[tw].favorite_count;
          var max_index = tw;
          tw++;

          if (tw >= twit_data.length) {
            twit_data[tw - 1].is_max = "true";
            break;
          }

          var next_day = twit_data[tw].date;

          while (current == next_day) {
            var sum = twit_data[tw].retweet_count + twit_data[tw].favorite_count;

            if (sum > max_tweets) {
              max_tweets = sum;
              max_index = tw;
            }

            tw++;

            if (tw >= twit_data.length) {
              break;
            }

            next_day = twit_data[tw].date;
          }

          twit_data[max_index].is_max = "true";
        } // add price field to objects in twit data based on stock price of that date
        // and add dummy stock points for missing dates


        var st = 0;
        console.log("adding price");

        for (tw = 0; tw < twit_data.length; tw++) {
          var t_date = twit_data[tw].date;

          while (st < stock_data.length) {
            var s_date = stock_data[st].date;

            if (t_date === s_date) {
              twit_data[tw].close = stock_data[st].close;
              break;
            } else if (t_date < s_date) {
              st++;
            } else {
              // there might not be a stock price for this day
              // insert a point in stocks for that day with previous day's stock price
              stock_data.splice(st, 0, {
                date: twit_data[tw].date,
                dateStr: stock_data[st].dateStr,
                close: stock_data[st].close,
                twitterPt: "true"
              });
              twit_data[tw].close = stock_data[st].close;
              break;
            }
          }
        }

        console.log("done"); // draw line graph with both datasets

        drawLineGraph(stock_data, twit_data);
      });
      return _callAPI.apply(this, arguments);
    }

    function drawLineGraph(stock_data, twit_data) {
      var svg = d3.select("#chart_svg");
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
      var svgheight = svg.attr("height");
      var dotSize = 3;
      var dateScale = d3.scaleTime().domain([minDate, maxDate]).range([0 + PADDING.LEFT, svgwidth - PADDING.RIGHT]);
      var priceScale = d3.scaleLinear().domain([0, maxPrice]).range([svgheight - PADDING.TOP, 0 + PADDING.BOTTOM]);
      var currentline = d3.line().x(function (d) {
        return dateScale(d.date);
      }).y(function (d) {
        return priceScale(parseFloat(d.close));
      });
      var yTranslation = svgheight - PADDING.LEFT;
      var xTranslation = 0 + PADDING.TOP;
      var xAxisX = (svgwidth - xTranslation) / 2;
      var xAxisY = svgheight - PADDING.BOTTOM / 3;
      var yAxisX = 0 + PADDING.RIGHT / 3;
      var yAxisY = svgheight - yTranslation / 2;
      var tooltip = d3.select("#tooltip");

      if (!props.updateScale) {
        // svg.append("g") creates an SVG <g> element, short for "group."
        // It doesn’t draw anything by itself, but serves to group child elements together.
        svg.append("g").call(d3.axisBottom(dateScale)) // d3 creates a bunch of elements inside the <g>
        .attr("transform", "translate(0, ".concat(yTranslation, ")")).attr("class", "xAxis");
        svg.append("g").call(d3.axisLeft(priceScale)).attr("transform", "translate(".concat(xTranslation, ", 0)")).attr("class", "yAxis");
        svg.append("text").attr("font-size", 14).attr("font-weight", "bold").attr("font-family", "Avenir").attr("x", xAxisX).attr("y", xAxisY).text("Date").attr("class", "xAxisLabel");
        svg.append("text").attr("font-size", 14) // This code duplication signals that these properties
        .attr("font-weight", "bold") // should be moved to CSS. For now, the code is this
        .attr("font-family", "Avenir") // way to simplify our directions to you.
        .attr("transform", "translate(".concat(yAxisX, " ").concat(yAxisY, ") rotate(-90)")).text("Price (USD)").attr("class", "yAxisLabel");
        svg.append("path").data([stock_data]).attr("d", currentline).attr("class", "chartLine");
        svg.selectAll(".twitterData").data(twit_data).enter().append("circle").filter(function (d) {
          return d.is_max == "true";
        }).attr("class", "twitterData").attr("r", dotSize + 2).attr("cx", function (d) {
          return dateScale(d.date);
        }).attr("cy", function (d) {
          return priceScale(parseFloat(d.close));
        }).attr("stroke", "#1EA1F2").attr("fill", "#1EA1F2").on("mouseover", (mouseEvent, d) => {
          // Runs when the mouse enters a dot.  d is the corresponding data point.
          tooltip.style("opacity", 1);
          tooltip.text(d.text); //TODO: send twitter id to sidebar and display twitter counts in tooltip

          sendTweetDataToSidebar(d);
        }).on("mousemove", (mouseEvent, d) => {
          /* Runs when mouse moves inside a dot */
          // var leftOffset = d3.pointer(mouseEvent)[0] + 3
          var leftOffset = dateScale(d.date) + 3;
          tooltip.style("left", leftOffset + "px"); // var topOffset = d3.pointer(mouseEvent)[1] + 3

          var topOffset = priceScale(parseFloat(d.close)) + PADDING.TOP + 3;
          tooltip.style("top", topOffset + "px"); //TODO: send twitter id to sidebar and display twitter counts in tooltip
          //sendTweetDataToSidebar(d);
        }).on("mouseout", (mouseEvent, d) => {
          tooltip.style("opacity", 0);
        });
        var stockData = svg.selectAll(".stockData").data(stock_data).enter().append("circle").attr("class", "stockData").attr("r", dotSize).attr("cx", function (d) {
          return dateScale(d.date);
        }).attr("cy", function (d) {
          return priceScale(parseFloat(d.close));
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
          var leftOffset = dateScale(d.date) + 3;
          tooltip.style("left", leftOffset + "px"); // var topOffset = d3.pointer(mouseEvent)[1] + 3

          var topOffset = priceScale(parseFloat(d.close)) + PADDING.TOP + 3;
          tooltip.style("top", topOffset + "px");
          sendDataToSidebar(d);
          setChangePriceYesterdayDataToSidebar(d3.select(this).attr("priceChange"));
          setChangePriceTweetDataToSidebar(d3.select(this).attr("priceChangeTweet"));
        }).on("mouseout", (mouseEvent, d) => {
          tooltip.style("opacity", 0);
        });
      }

      if (props.updateScale) {
        // remove duplicates of data being drawn
        d3.selectAll(".chartLine").remove();
        d3.selectAll(".twitterData").remove();
        d3.selectAll(".stockData").remove();
        svg = d3.select("#chart_svg").transition(); // Update lines

        svg.selectAll(".chartLine").duration(1000).attr("d", currentline); // Update tweet dots

        svg.selectAll(".twitterData").duration(1000).attr("cx", function (d) {
          return dateScale(d.date);
        }).attr("cy", function (d) {
          return priceScale(parseFloat(d.close));
        }); // Update stock dots

        svg.selectAll(".stockData").duration(1000).attr("cx", function (d) {
          return dateScale(d.date);
        }).attr("cy", function (d) {
          return priceScale(parseFloat(d.close));
        }); // Update axes and labels

        svg.selectAll(".xAxisLabel").attr("x", xAxisX).attr("y", xAxisY);
        svg.selectAll(".yAxisLabel").attr("transform", "translate(".concat(yAxisX, " ").concat(yAxisY, ") rotate(-90)"));
        svg.selectAll(".xAxis").duration(1000).call(d3.axisBottom(dateScale)) // d3 creates a bunch of elements inside the <g>
        .attr("transform", "translate(0, ".concat(yTranslation, ")"));
        svg.selectAll(".yAxis").duration(1000).call(d3.axisLeft(priceScale)).attr("transform", "translate(".concat(xTranslation, ", 0)"));
        props.onChangeUpdateScale(false);
      }
    }
  }

  useEffect(() => {
    drawChart();
  }, [props.updateScale]);
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