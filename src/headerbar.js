
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


 const domContainer = document.querySelector('#headerbar');

ReactDOM.render(<HeaderBar/>, domContainer);
