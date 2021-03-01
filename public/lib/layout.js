import React, { useState } from "react";
import ReactDOM from "react-dom";

//stylesheet
import "..//css/layout.css";

import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";
import Scalebar from "/lib/scalebar.js";

function Layout(props) {

  const [date, setDate] = useState("Hover over a point to begin.");
  const [price, setPrice] = useState("$525.69");
  const [priceChangeYesterday, setPriceChangeYesterday] = useState("$14.02");
  const [priceChangeTweet, setPriceChangeTweet] = useState("$2.96");
  const [timeScale, setTimeScale] = useState('1yr');
  const [updateScale, shouldUpdateScale] = useState(false);

  const changePrice = price => {
    setPrice(price);
    // console.log("Price:", price);
  };

  const changeDate = date => {
    setDate(date);
    // console.log("Date:", date);
  };

  const changePriceYesterday = pricechngyesterday => {
    setPriceChangeYesterday(pricechngyesterday);
  };

  const changePriceTweet = pricechngtweet => {
    setPriceChangeTweet(pricechngtweet);
  };

  const changeTimeScale = timeScale => {
    setTimeScale(timeScale);
    shouldUpdateScale(true);
  };

  const changeUpdateScale = updateScale => {
    shouldUpdateScale(updateScale);
  };

  return React.createElement(
    "div",
    { className: "grid-container" },
    React.createElement(
      "div",
      { className: "A" },
      React.createElement(HeaderBar, { className: "headerbar" })
    ),
    React.createElement(
      "div",
      { className: "B" },
      React.createElement(Chart, { className: "chart", timeScale: timeScale, updateScale: updateScale, onChangePrice: e => {
          changePrice(e);
        }, onChangeDate: e => {
          changeDate(e);
        }, onChangePriceYesterday: e => {
          changePriceYesterday(e);
        }, onChangePriceTweet: e => {
          changePriceTweet(e);
        }, onChangeUpdateScale: e => {
          changeUpdateScale(e);
        } })
    ),
    React.createElement(
      "div",
      { className: "C" },
      React.createElement(Scalebar, { className: "scalebar", onChangeTimeScale: e => {
          changeTimeScale(e);
        }, onChangeUpdateScale: e => {
          changeUpdateScale(e);
        } })
    ),
    React.createElement(
      "div",
      { className: "D" },
      React.createElement(Sidebar, { className: "sidebar", date: date, price: price, priceChangeYesterday: priceChangeYesterday, priceChangeTweet: priceChangeTweet })
    )
  );
}

export default Layout;

const domContainer = document.querySelector('#layout');

ReactDOM.render(React.createElement(Layout, null), domContainer);