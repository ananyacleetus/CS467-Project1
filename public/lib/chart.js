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
    props.onChangeDate(twitDateFormat(d.created_at).toString());
    props.onChangePrice(d3.format("($.2f")(d.close).toString()); //NOTE: Once you calculate the changes, you can send it in to the props
    // props.onChangePriceYesterday("".toString());
    // props.onChangePriceTweet("".toString());
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
        var twit_data = yield fetch("http://localhost:9000/twitterAPI").then(res => res.json()); // console.log(stock_data[0])

        console.log(twit_data); // console.log(twitDateFormat(new Date()))
        // add price field to objects in twit data based on stock price of that date

        var tw = 0;
        var st = 0;
        console.log("adding price");

        for (tw = 0; tw < twit_data.length; tw++) {
          while (st < stock_data.length) {
            var t_date = twitDateFormat(twit_data[tw].created_at).setHours(0, 0, 0, 0);
            var s_date = utcToDate(stock_data[st].date).setHours(0, 0, 0, 0); // console.log(typeof(t_date))
            // console.log(s_date)

            if (t_date === s_date) {
              twit_data[tw].close = stock_data[st].close; // console.log(stock_data[st].close)
              // console.log(twit_data[tw].close)

              break;
            } else if (t_date < s_date) {
              st++;
            } else {
              // there might not be a stock price for this day
              // average of previous and next day instead
              var prev = st - 1;

              if (st - 1 >= 0) {
                var avg = (stock_data[prev].close + stock_data[st].close) / 2;
                twit_data[tw].close = avg;
              } else {// elon's last tweet comes after our last stock data point,
                //TODO: remove the tweet or smth??
              } // tw++;


              break;
            }
          } // for (j = stock_data.length - 1; j >= 0; j--) {
          // }
          // twit_data[i].close = 600;

        }

        console.log("done"); // draw line graph with both datasets

        drawLineGraph(stock_data, twit_data); // fetch("http://localhost:9000/stockAPI/" + timescale)
        //     .then(res => res.json())
        //     .then(res => {
        //         drawLineGraph(res)
        //     })
      });
      return _callAPI.apply(this, arguments);
    }

    function drawLineGraph(stock_data, twit_data) {
      var svg = d3.select("#chart_svg");
      var minDate = d3.min(stock_data, function (d) {
        return utcToDate(d.date);
      });
      var maxDate = d3.max(stock_data, function (d) {
        return utcToDate(d.date);
      });
      var minPrice = d3.min(stock_data, function (d) {
        return parseFloat(d.close);
      });
      var maxPrice = d3.max(stock_data, function (d) {
        return parseFloat(d.close);
      }); //Get the current height and width of the SVG

      var svgwidth = svg.attr("width");
      var svgheight = svg.attr("height");
      var dotSize = 2;
      var dateScale = d3.scaleTime().domain([minDate, maxDate]).range([0 + PADDING.LEFT, svgwidth - PADDING.RIGHT]);
      var priceScale = d3.scaleLinear().domain([0, maxPrice]).range([svgheight - PADDING.TOP, 0 + PADDING.BOTTOM]);
      var currentline = d3.line().x(function (d) {
        return dateScale(utcToDate(d.date));
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
        svg.append("text").attr("font-size", 14).attr("font-weight", "bold").attr("font-family", "sans-serif").attr("x", xAxisX).attr("y", xAxisY).text("Date").attr("class", "xAxisLabel");
        svg.append("text").attr("font-size", 14) // This code duplication signals that these properties
        .attr("font-weight", "bold") // should be moved to CSS. For now, the code is this
        .attr("font-family", "sans-serif") // way to simplify our directions to you.
        .attr("transform", "translate(".concat(yAxisX, " ").concat(yAxisY, ") rotate(-90)")).text("Price (USD)").attr("class", "yAxisLabel");
        svg.append("path").data([stock_data]).attr("d", currentline).attr("class", "chartLine");
        svg.selectAll("dot").data(twit_data).enter().append("circle").attr("r", dotSize).attr("cx", function (d) {
          // console.log(d)
          // console.log(d.created_at)
          // console.log(twitDateFormat(d.created_at))
          return dateScale(twitDateFormat(d.created_at));
        }).attr("cy", function (d) {
          console.log(d.close);
          return priceScale(parseFloat(d.close));
        }).attr("stroke", "#FF0000").attr("fill", "#FF0000").on("mouseover", (mouseEvent, d) => {
          // Runs when the mouse enters a dot.  d is the corresponding data point.
          console.log(d);
          tooltip.style("opacity", 1);
          tooltip.text("The price is " + d3.format("($.2f")(d.close) + " at " + utcToDate(d.date));
          sendDataToSidebar(d);
        }).on("mousemove", (mouseEvent, d) => {
          /* Runs when mouse moves inside a dot */
          // var leftOffset = d3.pointer(mouseEvent)[0] + 3
          var leftOffset = dateScale(utcToDate(d.date)) + 3;
          tooltip.style("left", leftOffset + "px"); // var topOffset = d3.pointer(mouseEvent)[1] + 3

          var topOffset = priceScale(parseFloat(d.close)) + PADDING.TOP + 3;
          tooltip.style("top", topOffset + "px");
          sendDataToSidebar(d);
        }).on("mouseout", (mouseEvent, d) => {
          tooltip.style("opacity", 0);
        });
      }

      if (props.updateScale) {
        svg = d3.select("#chart_svg").transition(); // Update lines

        svg.selectAll(".chartLine").duration(1000).attr("d", currentline); // Update dots

        svg.selectAll("circle").duration(1000).attr("r", dotSize).attr("cx", function (d) {
          return dateScale(utcToDate(d.date));
        }).attr("cy", function (d) {
          return priceScale(parseFloat(d.close));
        }).attr("stroke", "#FF0000").attr("fill", "#FF0000"); // Update axes and labels

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
    console.log("ineffect");
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