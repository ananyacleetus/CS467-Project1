//stylesheet
import "..//css/layout.css";
import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeaderBar, {
      className: "headerbar"
    }), /*#__PURE__*/React.createElement(Chart, {
      className: "chart"
    }), /*#__PURE__*/React.createElement(Sidebar, {
      className: "sidebar"
    }));
  }

}

var domContainer = document.querySelector('#layout');
ReactDOM.render( /*#__PURE__*/React.createElement(Layout, null), domContainer);