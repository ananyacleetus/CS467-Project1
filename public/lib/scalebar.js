import React from "react";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'; //stylesheet

import "..//css/scalebar.css";

function Scalebar() {
  return /*#__PURE__*/React.createElement("div", {
    className: "fullbar"
  }, /*#__PURE__*/React.createElement(ToggleButtonGroup, {
    className: "buttonbar",
    variant: "contained",
    color: "primary",
    "aria-label": "contained primary button group",
    exclusive: "true"
  }, /*#__PURE__*/React.createElement(ToggleButton, null, "All Time"), /*#__PURE__*/React.createElement(ToggleButton, null, "3 Years"), /*#__PURE__*/React.createElement(ToggleButton, null, "1 Year"), /*#__PURE__*/React.createElement(ToggleButton, null, "1 Month"), /*#__PURE__*/React.createElement(ToggleButton, null, "1 Day")));
}

export default Scalebar;