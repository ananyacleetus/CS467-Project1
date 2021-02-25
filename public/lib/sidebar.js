import React, { useState } from "react"; //stylesheet

import "..//css/sidebar.css";

function Sidebar(props) {
  var [price, setPrice] = useState(null);
  var [date, setDate] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "fullsidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "currentinfo"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "date"
  }, "test1"), /*#__PURE__*/React.createElement("h1", {
    className: "price"
  }, "test2")));
}

export default Sidebar;