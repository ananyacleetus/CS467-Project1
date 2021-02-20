import * as d3 from "d3";

// const data = [
//     {h: 1, color: "red"},
//     {h: 2, color: "green"},
//     {h: 3, color: "purple"},
//     {h: 4, color: "orange"},
//     {h: 5, color: "blue"},
// ];



/*
 * Why this line? Because if this script runs before the svg exists, then nothing will happen, and d3 won't even
 * complain.  This delays drawing until the entire DOM has loaded.
 */
window.addEventListener("load", drawLineGraph);

var MARGIN = {TOP: 30, RIGHT: 50, BOTTOM: 30, LEFT: 50}

function drawLineGraph() {

  const svg = d3.select("svg");

  const data = d3.csv("/fakedata.csv").then(function(data) {

  //Should return month-day-year
  const dateFormat = d3.timeParse("%d-%b-%y");

  //Should return hourv(12h format) : minute : am/pm
  const timeFormat = d3.timeParse("%I:%M %p");

  const minDate = d3.min(data, function(d) { return dateFormat(d.date); });
  const maxDate = d3.max(data, function(d) { return dateFormat(d.date); });
  const minPrice = d3.min(data, function(d) { return d.price; });
  const maxPrice = d3.max(data, function(d) { return d.price; });

  //Get the current height and width of the SVG
  const svgwidth = svg.attr("width");
  const svgheight = svg.attr("height");

  var dateScale = d3.scaleTime()
  .domain(minDate, maxDate)
  .range([0, svgwidth]);

  var priceScale = d3.scaleLinear()
  .domain(0, maxPrice)
  .range([svgheight, 0]);

  var currentline = d3.line()
  .x(function(d) {
    console.log(d.date);
    console.log(dateFormat(d.date));
    console.log(dateScale(dateFormat(d.date)));

    console.log(minDate);
    console.log(maxDate);

    return dateScale(dateFormat(d.date)); })

  .y(function(d) { return priceScale(d.price); });

  svg.append("path")
    .data([data])
    .attr("d", currentline)
    .attr("class", "chartLine");

});




}
