import React from "react";
import ReactDOM from "react-dom"; //stylesheet

import "..//css/layout.css";
import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";
import Scalebar from "/lib/scalebar.js";

function Layout() {
  return /*#__PURE__*/React.createElement("div", {
    className: "grid-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "A"
  }, /*#__PURE__*/React.createElement(HeaderBar, {
    className: "headerbar"
  })), /*#__PURE__*/React.createElement("div", {
    className: "B"
  }, /*#__PURE__*/React.createElement(Chart, {
    className: "chart"
  })), /*#__PURE__*/React.createElement("div", {
    className: "C"
  }, /*#__PURE__*/React.createElement(Scalebar, {
    className: "scalebar"
  })), /*#__PURE__*/React.createElement("div", {
    className: "D"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    className: "sidebar"
  })));
}

export default Layout;
var domContainer = document.querySelector('#layout');
ReactDOM.render( /*#__PURE__*/React.createElement(Layout, null), domContainer);