import React, { useState } from "react";
import { Icon } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'; //stylesheet

import "..//css/sidebar.css";

function Sidebar(props) {
  // const [price, setPrice] = useState(null);
  // const [date, setDate] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "fullsidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "currentinfo"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "date"
  }, props.date), /*#__PURE__*/React.createElement("h1", {
    className: "price"
  }, "$" + props.price), /*#__PURE__*/React.createElement("div", {
    className: "priceChangeBox"
  }, /*#__PURE__*/React.createElement(ArrowDropUp, {
    className: "arrowup"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "priceChangeYesterday"
  }, "$14.02 since yesterday"), /*#__PURE__*/React.createElement(ArrowDropDown, {
    className: "arrowdown"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "priceChangeLastTweet"
  }, "$2.96 since last tweet"))));
}

export default Sidebar;