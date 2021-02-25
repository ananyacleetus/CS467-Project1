
//stylesheet
import "..//css/layout.css";

import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";
import Scalebar from "/lib/scalebar.js";


class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="grid-container">
        <div className="A">
        <HeaderBar className="headerbar"/>
        </div>
        <div className="B">
        <Chart className="chart"/>
        </div>
        <div className="C">
        <Scalebar className="scalebar"/>
        </div>
        <div className="D">
        <Sidebar className="sidebar"/>
        </div>
      </div>
    );

  }
}


const domContainer = document.querySelector('#layout');

ReactDOM.render(<Layout/>, domContainer);
