import React, { useState } from "react";
import { Icon } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

//stylesheet
import "..//css/sidebar.css";

function Sidebar(props) {
  return React.createElement(
    'div',
    { className: 'fullsidebar' },
    React.createElement(
      'div',
      { className: 'currentinfo' },
      React.createElement(
        'h2',
        { className: 'date' },
        props.date
      ),
      React.createElement(
        'h1',
        { className: 'price' },
        "$" + props.price
      ),
      React.createElement(
        'div',
        { className: 'priceChangeBox' },
        React.createElement(ArrowDropUp, { className: 'arrowup' }),
        React.createElement(
          'h2',
          { className: 'priceChangeYesterday' },
          props.priceChangeYesterday + " since yesterday"
        ),
        React.createElement(ArrowDropDown, { className: 'arrowdown' }),
        React.createElement(
          'h2',
          { className: 'priceChangeLastTweet' },
          props.priceChangeTweet + " since last tweet"
        )
      ),
      React.createElement(
        'div',
        { className: 'tweetBox' },
        React.createElement(
          'h2',
          null,
          'Insert Embedly Tweet Here'
        )
      )
    )
  );
}

export default Sidebar;