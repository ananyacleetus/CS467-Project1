import React, {useState} from "react";
import ReactDOM from "react-dom";

//stylesheet
import "..//css/layout.css";

import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";
import Scalebar from "/lib/scalebar.js";


function Layout (props) {

  const [date, setDate] = useState("1");
  const [price, setPrice] = useState("2");

  const changePrice = (price) => {
        setPrice(price)
        console.log("Price:", price);
    }

  const changeDate = (date) => {
        setDate(date)
        console.log("Date:", date);
    }


    return (

      <div className="grid-container">
        <div className="A">
        <HeaderBar className="headerbar"/>
        </div>
        <div className="B">
        <Chart className="chart" onChangePrice={(e) => { changePrice(e) }} onChangeDate={(e) => { changeDate(e) }}/>
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
