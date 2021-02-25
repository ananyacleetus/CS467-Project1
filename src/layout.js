import React, {useState} from "react";
import ReactDOM from "react-dom";

//stylesheet
import "..//css/layout.css";

import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";
import Scalebar from "/lib/scalebar.js";


function Layout (props) {

  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');

  const onChangePrice = (price) => {
        setPrice(price)
        console.log("Price:", price);
    }

  const onChangeDate = (date) => {
        setDate(date)
        console.log("Date:", date);
    }


    return (

      <div className="grid-container">
        <div className="A">
        <HeaderBar className="headerbar"/>
        </div>
        <div className="B">
        <Chart className="chart" date={date} price={price} onChangePrice={(e) => { onChangePrice(e) }} onChangeDate={(e) => { onChangeDate(e) }}/>
        </div>
        <div className="C">
        <Scalebar className="scalebar"/>
        </div>
        <div className="D">
        <Sidebar className="sidebar" date={date} price={price}/>
        </div>
      </div>
    );

  }


export default Layout;


const domContainer = document.querySelector('#layout');

ReactDOM.render(<Layout/>, domContainer);
