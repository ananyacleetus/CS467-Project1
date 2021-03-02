import React, { useState, useEffect } from "react";
import { Icon } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import TweetEmbed from 'react-tweet-embed'; //stylesheet

import "..//css/sidebar.css";

function Sidebar(props) {
  var [arrowPriceChangeYesterday, setArrowPriceChangeYesterday] = useState("up");
  var [arrowPriceChangeTweet, setArrowPriceChangeTweet] = useState("down");
  var firstArrow = /*#__PURE__*/React.createElement(ArrowDropUp, {
    className: "arrowup"
  });
  var firstArrowDir = "up";
  var secondArrow = /*#__PURE__*/React.createElement(ArrowDropDown, {
    className: "arrowdown"
  });
  var secondArrowDir = "down";

  if (props.priceChangeYesterday[0] == " ") {
    firstArrowDir = "up";
  } else {
    firstArrowDir = "down";
  }

  if (firstArrowDir == "up") {
    firstArrow = /*#__PURE__*/React.createElement(ArrowDropUp, {
      className: "arrowup"
    });
  } else {
    firstArrow = /*#__PURE__*/React.createElement(ArrowDropDown, {
      className: "arrowdown"
    });
  }

  if (props.priceChangeTweet[0] == " ") {
    secondArrowDir = "up";
  } else {
    secondArrowDir = "down";
  }

  if (secondArrowDir == "up") {
    secondArrow = /*#__PURE__*/React.createElement(ArrowDropUp, {
      className: "arrowup"
    });
  } else {
    secondArrow = /*#__PURE__*/React.createElement(ArrowDropDown, {
      className: "arrowdown"
    });
  }

  useEffect(() => {
    setArrowPriceChangeYesterday(firstArrow);
    setArrowPriceChangeTweet(secondArrow);
  }, [props.priceChangeYesterday]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fullsidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "currentinfo"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "date"
  }, props.date), /*#__PURE__*/React.createElement("h1", {
    className: "price"
  }, props.price), /*#__PURE__*/React.createElement("div", {
    className: "priceChangeBox"
  }, firstArrow, /*#__PURE__*/React.createElement("h2", {
    className: "priceChangeYesterday"
  }, props.priceChangeYesterday.substring(1) + " since yesterday"), secondArrow, /*#__PURE__*/React.createElement("h2", {
    className: "priceChangeLastTweet"
  }, props.priceChangeTweet.substring(1) + " since last tweet")), /*#__PURE__*/React.createElement("div", {
    className: "tweetBox"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "topTweet"
  }, "Top Elon Tweet of that Day:"), /*#__PURE__*/React.createElement(TweetEmbed, {
    id: props.tweetID
  }))));
}

export default Sidebar;