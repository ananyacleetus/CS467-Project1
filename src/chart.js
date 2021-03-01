import * as d3 from "d3";
import React, { useState, useEffect } from "react";
// import fs from "fs";

//stylesheet
import "..//css/chart.css";

function Chart(props) {

  // const [updateScale, shouldUpdateScale] = React.useState(false);

    // shouldUpdateScale(props.updateScale);

    var timescale = props.timeScale;


    // Should return month-day-year
    // const dateFormat = d3.timeParse("%d-%b-%y");

    const utcToDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

    //Should return hourv(12h format) : minute : am/pm
    const timeFormat = d3.timeParse("%I:%M %p");

    const sendDataToSidebar = (d) => {


        props.onChangeDate(utcToDate(d.date).toString());
        props.onChangePrice(d3.format("($.2f")(d.close).toString());

        //NOTE: Once you calculate the changes, you can send it in to the props
        // props.onChangePriceYesterday("".toString());
        // props.onChangePriceTweet("".toString());

    }

    function drawChart() {

        window.addEventListener("load", callAPI(timescale));

        var PADDING = { TOP: 50, RIGHT: 50, BOTTOM: 50, LEFT: 50 }

        function callAPI(timescale) {
          // ts = "1yr";
          // ts = timescale;

            fetch("http://localhost:9000/stockAPI/" + timescale)
                .then(res => res.json())
                .then(res => {
                    drawLineGraph(res)
                })
        }

        function drawLineGraph(data) {

            var svg = d3.select("#chart_svg");

            const minDate = d3.min(data, function (d) { return utcToDate(d.date); });
            const maxDate = d3.max(data, function (d) { return utcToDate(d.date); });
            const minPrice = d3.min(data, function (d) { return parseFloat(d.close); });
            const maxPrice = d3.max(data, function (d) { return parseFloat(d.close); });

            //Get the current height and width of the SVG
            const svgwidth = svg.attr("width");
            const svgheight = svg.attr("height");

            const dotSize = 2;

            var dateScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0 + PADDING.LEFT, svgwidth - PADDING.RIGHT]);

            var priceScale = d3.scaleLinear()
                .domain([0, maxPrice])
                .range([svgheight - PADDING.TOP, 0 + PADDING.BOTTOM]);

            var currentline = d3.line()
                .x(function (d) { return dateScale(utcToDate(d.date));  })
                .y(function (d) { return priceScale(parseFloat(d.close)); })


            const yTranslation = svgheight - PADDING.LEFT;
            const xTranslation = 0 + PADDING.TOP;

            const xAxisX = (svgwidth - xTranslation) / 2;
            const xAxisY = svgheight - PADDING.BOTTOM / 3;

            const yAxisX = 0 + PADDING.RIGHT / 3;
            const yAxisY = svgheight - yTranslation / 2;

             const tooltip = d3.select("#tooltip");


             if (!props.updateScale) {

             // svg.append("g") creates an SVG <g> element, short for "group."
             // It doesn’t draw anything by itself, but serves to group child elements together.
             svg.append("g")
                 .call(d3.axisBottom(dateScale)) // d3 creates a bunch of elements inside the <g>
                 .attr("transform", `translate(0, ${yTranslation})`)
                 .attr("class", "xAxis");

             svg.append("g")
                 .call(d3.axisLeft(priceScale))
                 .attr("transform", `translate(${xTranslation}, 0)`)
                 .attr("class", "yAxis");


            svg.append("text")
                .attr("font-size", 14)
                .attr("font-weight", "bold")
                .attr("font-family", "sans-serif")
                .attr("x", xAxisX)
                .attr("y", xAxisY)
                .text("Date")
                .attr("class", "xAxisLabel");

            svg.append("text")
                .attr("font-size", 14) // This code duplication signals that these properties
                .attr("font-weight", "bold") // should be moved to CSS. For now, the code is this
                .attr("font-family", "sans-serif") // way to simplify our directions to you.
                .attr("transform", `translate(${yAxisX} ${yAxisY}) rotate(-90)`)
                .text("Price (USD)")
                .attr("class", "yAxisLabel");



            svg.append("path")
                .data([data])
                .attr("d", currentline)
                .attr("class", "chartLine");

                   svg.selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("r", dotSize)
                    .attr("cx", function(d) { return dateScale(utcToDate(d.date)); })
                    .attr("cy", function(d) { return priceScale(parseFloat(d.close)); })
                    .attr("stroke", "#FF0000")
                    .attr("fill", "#FF0000")
                    .on("mouseover", (mouseEvent, d) => {
                       // Runs when the mouse enters a dot.  d is the corresponding data point.
                       console.log(d);
                       tooltip.style("opacity", 1);
                       tooltip.text("The price is " + d3.format("($.2f")(d.close) + " at " + utcToDate(d.date));

                       sendDataToSidebar(d);
                     })

                       .on("mousemove", (mouseEvent, d) => {
                       /* Runs when mouse moves inside a dot */
                       // var leftOffset = d3.pointer(mouseEvent)[0] + 3
                       var leftOffset = dateScale(utcToDate(d.date)) + 3
                       tooltip.style("left", leftOffset + "px");

                       // var topOffset = d3.pointer(mouseEvent)[1] + 3
                       var topOffset = priceScale(parseFloat(d.close)) + PADDING.TOP + 3
                       tooltip.style("top", topOffset + "px");

                       sendDataToSidebar(d);
                     })
                       .on("mouseout", (mouseEvent, d) => {
                         tooltip.style("opacity", 0);
             });

}
             if (props.updateScale) {

               svg = d3.select("#chart_svg").transition();

               // Update lines
               svg.select(".chartLine")
               .duration(850)
               .attr("d", currentline);

               // Update dots
               svg.selectAll("circle")
                .duration(850)
                .attr("r", dotSize)
                .attr("cx", function(d) { return dateScale(utcToDate(d.date)); })
                .attr("cy", function(d) { return priceScale(parseFloat(d.close)); })
                .attr("stroke", "#FF0000")
                .attr("fill", "#FF0000");


                 // Update axes and labels
                 svg.select(".xAxisLabel")
                 .attr("x", xAxisX)
                 .attr("y", xAxisY);

                 svg.select(".yAxisLabel")
                 .attr("transform", `translate(${yAxisX} ${yAxisY}) rotate(-90)`);

                 svg.select(".xAxis")
                 .call(d3.axisBottom(dateScale)) // d3 creates a bunch of elements inside the <g>
                 .attr("transform", `translate(0, ${yTranslation})`);

                 svg.select(".yAxis")
                 .call(d3.axisLeft(priceScale))
                 .attr("transform", `translate(${xTranslation}, 0)`);

                 props.onChangeUpdateScale(false);


               }

             }

    }


    useEffect(() => {
      console.log("ineffect");
        drawChart();
    }, [props.updateScale]);

    return (

        <div id="fullChart">

            <div id="tooltip" className="tooltip" style={{ "opacity": 0 }}>Hover over a point to start!</div>
            <svg id="chart_svg" width="1000" height="700"></svg>

        </div>

    );

}


export default Chart;
