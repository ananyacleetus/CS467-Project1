//stylesheet
import "..//layout.css";
import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeaderBar, null), /*#__PURE__*/React.createElement(Chart, null));
  }

}

var domContainer = document.querySelector('#layout');
ReactDOM.render( /*#__PURE__*/React.createElement(Layout, null), domContainer);