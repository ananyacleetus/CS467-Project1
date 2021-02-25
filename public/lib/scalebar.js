import React from "react";
import { Button, ButtonGroup } from '@material-ui/core'; //stylesheet

import "..//css/scalebar.css";

function Scalebar() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "name"
  }, "Insert Scale Here"), /*#__PURE__*/React.createElement(ButtonGroup, {
    variant: "contained",
    color: "primary",
    "aria-label": "contained primary button group"
  }, /*#__PURE__*/React.createElement(Button, null, "One"), /*#__PURE__*/React.createElement(Button, null, "Two"), /*#__PURE__*/React.createElement(Button, null, "Three")));
}

export default Scalebar;