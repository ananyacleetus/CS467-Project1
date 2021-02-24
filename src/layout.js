
//stylesheet
import "..//layout.css";

import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div>
      <HeaderBar/>
      <Chart/>
      </div>
    );

  }
}


const domContainer = document.querySelector('#layout');

ReactDOM.render(<Layout/>, domContainer);
