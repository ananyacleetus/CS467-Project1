import React, { useState } from "react";
import ReactDOM from "react-dom"; //stylesheet

import "..//css/layout.css";
import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";
import Scalebar from "/lib/scalebar.js";

function Layout(props) {
  var [date, setDate] = useState("Hover over a point to begin.");
  var [price, setPrice] = useState("$525.69");
  var [priceChangeYesterday, setPriceChangeYesterday] = useState(" $14.02");
  var [priceChangeTweet, setPriceChangeTweet] = useState(" $2.96");
  var [timeScale, setTimeScale] = useState('1yr');
  var [updateScale, shouldUpdateScale] = useState(false);
  var [tweetID, setTweetID] = React.useState('1364826301027115008');

  var changePrice = price => {
    setPrice(price); // console.log("Price:", price);
  };

  var changeDate = date => {
    setDate(date); // console.log("Date:", date);
  };

  var changePriceYesterday = pricechngyesterday => {
    setPriceChangeYesterday(pricechngyesterday);
  };

  var changePriceTweet = pricechngtweet => {
    setPriceChangeTweet(pricechngtweet);
  };

  var changeTimeScale = timeScale => {
    setTimeScale(timeScale);
    shouldUpdateScale(true);
  };

  var changeUpdateScale = updateScale => {
    shouldUpdateScale(updateScale);
  };

  var changeTweetID = tweetID => {
    setTweetID(tweetID);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "grid-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "A"
  }, /*#__PURE__*/React.createElement(HeaderBar, {
    className: "headerbar"
  })), /*#__PURE__*/React.createElement("div", {
    className: "B"
  }, /*#__PURE__*/React.createElement(Chart, {
    className: "chart",
    timeScale: timeScale,
    updateScale: updateScale,
    onChangeTweetID: e => {
      changeTweetID(e);
    },
    onChangePrice: e => {
      changePrice(e);
    },
    onChangeDate: e => {
      changeDate(e);
    },
    onChangePriceYesterday: e => {
      changePriceYesterday(e);
    },
    onChangePriceTweet: e => {
      changePriceTweet(e);
    },
    onChangeUpdateScale: e => {
      changeUpdateScale(e);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "C"
  }, /*#__PURE__*/React.createElement(Scalebar, {
    className: "scalebar",
    onChangeTimeScale: e => {
      changeTimeScale(e);
    },
    onChangeUpdateScale: e => {
      changeUpdateScale(e);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "D"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    className: "sidebar",
    date: date,
    price: price,
    tweetID: tweetID,
    priceChangeYesterday: priceChangeYesterday,
    priceChangeTweet: priceChangeTweet
  })));
}

export default Layout;
var domContainer = document.querySelector('#layout');
ReactDOM.render( /*#__PURE__*/React.createElement(Layout, null), domContainer);