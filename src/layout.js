
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

    return (

      <div>
      <HeaderBar className="headerbar"/>
      <Chart className="chart"/>
      <Sidebar className="sidebar"/>
      </div>
    );

  }
}


const domContainer = document.querySelector('#layout');

ReactDOM.render(<Layout/>, domContainer);
