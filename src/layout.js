import React, {useState} from "react";
import ReactDOM from "react-dom";

//stylesheet
import "..//css/layout.css";

import HeaderBar from "/lib/headerbar.js";
import Chart from "/lib/chart.js";
import Sidebar from "/lib/sidebar.js";
import Scalebar from "/lib/scalebar.js";


function Layout (props) {

  const [date, setDate] = useState("Hover over a point to begin.");
  const [price, setPrice] = useState("$525.69");
  const [priceChangeYesterday, setPriceChangeYesterday] = useState("$14.02");
  const [priceChangeTweet, setPriceChangeTweet] = useState("$2.96");
  const [timeScale, setTimeScale] = useState('1yr');

  const changePrice = (price) => {
        setPrice(price)
        // console.log("Price:", price);
    }

  const changeDate = (date) => {
        setDate(date)
        // console.log("Date:", date);
    }

    const changePriceYesterday = (pricechngyesterday) => {
          setPriceChangeYesterday(pricechngyesterday)
      }

    const changePriceTweet = (pricechngtweet) => {
          setPriceChangeTweet(pricechngtweet)
      }


    return (

      <div className="grid-container">
        <div className="A">
        <HeaderBar className="headerbar"/>
        </div>
        <div className="B">
        <Chart className="chart" onChangePrice={(e) => { changePrice(e) }} onChangeDate={(e) => { changeDate(e) }}  onChangePriceYesterday={(e) => { changePriceYesterday(e) }} onChangePriceTweet={(e) => { changePriceTweet(e) }}/>
        </div>
        <div className="C">
        <Scalebar className="scalebar"/>
        </div>
        <div className="D">
        <Sidebar className="sidebar" date={date} price={price} priceChangeYesterday={priceChangeYesterday} priceChangeTweet={priceChangeTweet}/>
        </div>
      </div>
    );

  }


export default Layout;


const domContainer = document.querySelector('#layout');

ReactDOM.render(<Layout/>, domContainer);
