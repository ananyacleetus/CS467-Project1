function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import drawChart from "/lib/chart.js"; //stylesheet

import "..//css/selectionbar.css";

function SelectionBar(props) {
  var [stockState, setStockState] = React.useState({
    tsla: true,
    etsy: false,
    gme: false,
    sigl: false,
    btcusd: false
  });

  var handleChange = event => {
    setStockState(_objectSpread(_objectSpread({}, stockState), {}, {
      [event.target.name]: event.target.checked
    }));
    props.onChangeStockState(_objectSpread(_objectSpread({}, stockState), {}, {
      [event.target.name]: event.target.checked
    }));
  };

  var {
    tsla,
    etsy,
    gme,
    sigl,
    btcusd
  } = stockState;
  var error = [tsla, etsy, gme, sigl, btcusd].filter(v => v).length == 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "fullselectionbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stockselection"
  }, /*#__PURE__*/React.createElement(FormControl, {
    required: true,
    error: error,
    component: "fieldset",
    className: "stockformcontrol"
  }, /*#__PURE__*/React.createElement(FormLabel, {
    component: "legend"
  }, "Select stock(s)"), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: tsla,
      onChange: handleChange,
      name: "tsla"
    }),
    label: "TSLA"
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: etsy,
      onChange: handleChange,
      name: "etsy"
    }),
    label: "ETSY"
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: gme,
      onChange: handleChange,
      name: "gme"
    }),
    label: "GME"
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: sigl,
      onChange: handleChange,
      name: "sigl"
    }),
    label: "SIGL"
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: btcusd,
      onChange: handleChange,
      name: "btcusd"
    }),
    label: "BTCUSD"
  })), /*#__PURE__*/React.createElement(FormHelperText, null, "Please select at least one option"))));
}

export default SelectionBar;