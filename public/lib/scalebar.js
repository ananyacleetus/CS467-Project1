import React from "react";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import drawChart from "/lib/chart.js"; //stylesheet

import "..//css/scalebar.css";

function Scalebar(props) {
  var [timeScale, setTimeScale] = React.useState('1yr');

  var handleTimeScale = (event, newTimeScale) => {
    setTimeScale(newTimeScale);
    props.onChangeTimeScale(newTimeScale);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "fullscalebar"
  }, /*#__PURE__*/React.createElement(ToggleButtonGroup, {
    className: "buttonbar",
    value: timeScale,
    onChange: handleTimeScale,
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
    value: "3mo"
  }, "3 Months"), /*#__PURE__*/React.createElement(ToggleButton, {
    value: "1mo"
  }, "1 Month")));
}

export default Scalebar;