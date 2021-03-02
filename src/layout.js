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
  const [priceChangeYesterday, setPriceChangeYesterday] = useState(" $14.02");
  const [priceChangeTweet, setPriceChangeTweet] = useState(" $2.96");
  const [timeScale, setTimeScale] = useState('1yr');
  const [updateScale, shouldUpdateScale] = useState(false);
  const [tweetID, setTweetID] = React.useState('1364826301027115008');



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

    const changeTimeScale = (timeScale) => {
            setTimeScale(timeScale)
            shouldUpdateScale(true);
      }

      const changeUpdateScale = (updateScale) => {
              shouldUpdateScale(updateScale)
        }

      const changeTweetID = (tweetID) => {
            setTweetID(tweetID)
        }


    return (

      <div className="grid-container">
        <div className="A">
        <HeaderBar className="headerbar"/>
        </div>
        <div className="B">
        <Chart className="chart" timeScale={timeScale} updateScale={updateScale} onChangeTweetID={(e) => { changeTweetID(e) }} onChangePrice={(e) => { changePrice(e) }} onChangeDate={(e) => { changeDate(e) }}  onChangePriceYesterday={(e) => { changePriceYesterday(e) }} onChangePriceTweet={(e) => { changePriceTweet(e) }} onChangeUpdateScale={(e) => { changeUpdateScale(e) }} />
        </div>
        <div className="C">
        <Scalebar className="scalebar" onChangeTimeScale={(e) => { changeTimeScale(e) }}  onChangeUpdateScale={(e) => { changeUpdateScale(e) }}/>
        </div>
        <div className="D">
        <Sidebar className="sidebar" date={date} price={price} tweetID={tweetID} priceChangeYesterday={priceChangeYesterday} priceChangeTweet={priceChangeTweet}/>
        </div>
      </div>
    );

  }


export default Layout;


const domContainer = document.querySelector('#layout');

ReactDOM.render(<Layout/>, domContainer);
