import React from "react";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Icon } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons'; //stylesheet

import "..//css/scalebar.css";

function Scalebar() {
  return /*#__PURE__*/React.createElement("div", {
    className: "fullscalebar"
  }, /*#__PURE__*/React.createElement(ToggleButtonGroup, {
    className: "buttonbar",
    variant: "contained",
    color: "primary",
    "aria-label": "contained primary button group",
    exclusive: true
  }, /*#__PURE__*/React.createElement(ToggleButton, {
    value: "all"
  }, "All Time"), /*#__PURE__*/React.createElement(ToggleButton, {
    value: "3yr"
  }, "3 Years"), /*#__PURE__*/React.createElement(ToggleButton, {
    value: "1yr"
  }, "1 Year"), /*#__PURE__*/React.createElement(ToggleButton, {
    value: "1mo"
  }, "1 Month"), /*#__PURE__*/React.createElement(ToggleButton, {
    value: "1dy"
  }, "1 Day")));
}

export default Scalebar;