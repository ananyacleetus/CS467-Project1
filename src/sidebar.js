import React, {useState, useEffect} from "react";
import { Icon } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import TweetEmbed from 'react-tweet-embed';

 //stylesheet
 import "..//css/sidebar.css";


 function Sidebar (props) {

   const [arrowPriceChangeYesterday, setArrowPriceChangeYesterday] = useState("up");


   let firstArrow = <ArrowDropUp className="arrowup"/>
   let firstArrowDir = "up";

   if (props.priceChangeYesterday[0] == " ") {
     firstArrowDir = "up";
   } else {
     firstArrowDir = "down";
   }

   if (firstArrowDir == "up") {
     firstArrow = <ArrowDropUp className="arrowup"/>;
     console.log("true");
   } else {
     firstArrow = <ArrowDropDown className="arrowdown"/>;
     console.log("false");
   }


      useEffect(() => {
        setArrowPriceChangeYesterday(firstArrow);
      }, [props.priceChangeYesterday]);

     return (

       <div className="fullsidebar">

         <div className="currentinfo">

           <h2 className="date">{props.date}</h2>
           <h1 className="price">{props.price}</h1>


           <div className="priceChangeBox">
             {firstArrow}
           <h2 className="priceChangeYesterday">{props.priceChangeYesterday.substring(1) + " since yesterday"}</h2>
            <ArrowDropDown className="arrowdown"/>
           <h2 className="priceChangeLastTweet">{props.priceChangeTweet + " since last tweet"}</h2>
           </div>


           <div className="tweetBox">
               <TweetEmbed id={props.tweetID} />
           </div>

     </div>

   </div>

   );

   }

 export default Sidebar;
