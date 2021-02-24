import * as d3 from "d3";

/*
 * Why this line? Because if this script runs before the svg exists, then nothing will happen, and d3 won't even
 * complain.  This delays drawing until the entire DOM has loaded.
 */
window.addEventListener("load", drawLineGraph);

var PADDING = { TOP: 50, RIGHT: 50, BOTTOM: 50, LEFT: 50 };

function drawLineGraph() {

  var svg = d3.select("#chart_svg");

  var data = d3.csv("/fakedata.csv").then(function (data) {

    //Should return month-day-year
    var dateFormat = d3.timeParse("%d-%b-%y");

    //Should return hourv(12h format) : minute : am/pm
    var timeFormat = d3.timeParse("%I:%M %p");

    var minDate = d3.min(data, function (d) {
      return dateFormat(d.date);
    });
    var maxDate = d3.max(data, function (d) {
      return dateFormat(d.date);
    });
    var minPrice = d3.min(data, function (d) {
      return parseFloat(d.price);
    });
    var maxPrice = d3.max(data, function (d) {
      return parseFloat(d.price);
    });

    //Get the current height and width of the SVG
    var svgwidth = svg.attr("width");
    var svgheight = svg.attr("height");

    var dotSize = 5;

    var dateScale = d3.scaleTime().domain([minDate, maxDate]).range([0 + PADDING.LEFT, svgwidth - PADDING.RIGHT]);

    var priceScale = d3.scaleLinear().domain([0, maxPrice]).range([svgheight - PADDING.TOP, 0 + PADDING.BOTTOM]);

    var currentline = d3.line().x(function (d) {
      return dateScale(dateFormat(d.date));
    }).y(function (d) {
      return priceScale(parseFloat(d.price));
    });

    var yTranslation = svgheight - PADDING.LEFT;
    var xTranslation = 0 + PADDING.TOP;

    // svg.append("g") creates an SVG <g> element, short for "group."
    // It doesn’t draw anything by itself, but serves to group child elements together.
    var xAxis = svg.append("g").call(d3.axisBottom(dateScale)) // d3 creates a bunch of elements inside the <g>
    .attr("transform", "translate(0, " + yTranslation + ")");

    var yAxis = svg.append("g").call(d3.axisLeft(priceScale)).attr("transform", "translate(" + xTranslation + ", 0)");

    var xAxisX = (svgwidth - xTranslation) / 2;
    var xAxisY = svgheight - PADDING.BOTTOM / 3;

    var yAxisX = 0 + PADDING.RIGHT / 3;
    var yAxisY = svgheight - yTranslation / 2;

    var tooltip = d3.select("#tooltip");

    svg.append("text").attr("font-size", 12).attr("font-weight", "bold").attr("font-family", "sans-serif").attr("x", xAxisX).attr("y", xAxisY).text("Date");

    svg.append("text").attr("font-size", 12) // This code duplication signals that these properties
    .attr("font-weight", "bold") // should be moved to CSS. For now, the code is this
    .attr("font-family", "sans-serif") // way to simplify our directions to you.
    .attr("transform", "translate(" + yAxisX + " " + yAxisY + ") rotate(-90)").text("Price (USD)");

    svg.append("path").data([data]).attr("d", currentline).attr("class", "chartLine");

    svg.selectAll("dot").data(data).enter().append("circle").attr("r", dotSize).attr("cx", function (d) {
      return dateScale(dateFormat(d.date));
    }).attr("cy", function (d) {
      return priceScale(parseFloat(d.price));
    }).attr("stroke", "#FF0000").attr("fill", "#FF0000").on("mouseover", function (mouseEvent, d) {
      // Runs when the mouse enters a dot.  d is the corresponding data point.
      tooltip.style("opacity", 1);
      tooltip.text("The price is $" + parseFloat(d.price) + " at " + dateFormat(d.date));
    }).on("mousemove", function (mouseEvent, d) {
      /* Runs when mouse moves inside a dot */
      var leftOffset = d3.pointer(mouseEvent)[0] + 5;
      tooltip.style("left", leftOffset + "px");

      var topOffset = d3.pointer(mouseEvent)[1] + 5;
      tooltip.style("top", topOffset + "px");
    }).on("mouseout", function (mouseEvent, d) {
      tooltip.style("opacity", 0);
    });
  });
}