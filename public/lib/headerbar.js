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
ReactDOM.render( /*#__PURE__*/React.createElement(HeaderBar, null), domContainer); //
// 'use strict';
//
// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }
//
//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }
//
//     return (
//       <button onClick={() => this.setState({ liked: true }) }>
//         Like
//       </button>
//     );
//   }
// }
//
// let domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(<LikeButton />, domContainer);