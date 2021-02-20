import * as d3 from "d3";

const data = [
    {h: 1, color: "red"},
    {h: 2, color: "green"},
    {h: 3, color: "purple"},
    {h: 4, color: "orange"},
    {h: 5, color: "blue"},
];

/*
 * Why this line? Because if this script runs before the svg exists, then nothing will happen, and d3 won't even
 * complain.  This delays drawing until the entire DOM has loaded.
 */
window.addEventListener("load", drawBars);


var y = d3.scaleLinear()
  .domain([6, 0])
  .range([100, 0]);

function drawBars() {
    const svg = d3.select("svg");
    svg.selectAll("rect")
        .data(data)
        .join("rect")
            .attr('x', function(d, i) { return 20 + (25 * i)} )
            .attr("y", function(d) { return 100 - y(d.h); } )
            .attr("height", function(d) { return y(d.h); } )
            .attr("width", 20)
            .attr("fill", d => d.color);
}
