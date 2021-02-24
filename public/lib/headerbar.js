//stylesheet
import "..//headerbar.css";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "grid-container-header"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "title"
    }, "Tesla Stock Price (TSLA) compared to Elon Musk Tweets"));
  }

}

var domContainer = document.querySelector('#headerbar');
ReactDOM.render( /*#__PURE__*/React.createElement(HeaderBar, null), domContainer);