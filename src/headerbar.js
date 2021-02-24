“

 //stylesheet
 import "..//headerbar.css";


 class HeaderBar extends React.Component {
   constructor(props) {
     super(props);
   }

   render() {

     return (

     <div className="grid-container-header">
     <h1 className="title">Tesla Stock Price (TSLA) compared to Elon Musk Tweets</h1>
     </div>

   );

   }
 }

  export default HeaderBar;

 const domContainer = document.getElementById('#headerbar');
  const domContainer = document.getElementById("root");

ReactDOM.render(HeaderBar, domContainer);
ReactDOM.render(<HeaderBar/>, domContainer);”

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
