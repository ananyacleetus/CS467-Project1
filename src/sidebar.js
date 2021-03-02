import React, {useState, useEffect} from "react";
import { Icon } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import TweetEmbed from 'react-tweet-embed';

 //stylesheet
 import "..//css/sidebar.css";


 function Sidebar (props) {

   const [arrowPriceChangeYesterday, setArrowPriceChangeYesterday] = useState("up");
   const [arrowPriceChangeTweet, setArrowPriceChangeTweet] = useState("down");


   let firstArrow = <ArrowDropUp className="arrowup"/>;
   let firstArrowDir = "up";

   let secondArrow = <ArrowDropDown className="arrowdown"/>;
   let secondArrowDir = "down";

   if (props.priceChangeYesterday[0] == " ") {
     firstArrowDir = "up";
   } else {
     firstArrowDir = "down";
   }

   if (firstArrowDir == "up") {
     firstArrow = <ArrowDropUp className="arrowup"/>;
   } else {
     firstArrow = <ArrowDropDown className="arrowdown"/>;
   }


   if (props.priceChangeTweet[0] == " ") {
     secondArrowDir = "up";
   } else {
     secondArrowDir = "down";
   }

   if (secondArrowDir == "up") {
     secondArrow = <ArrowDropUp className="arrowup"/>;
   } else {
     secondArrow = <ArrowDropDown className="arrowdown"/>;
   }


      useEffect(() => {
        setArrowPriceChangeYesterday(firstArrow);
        setArrowPriceChangeTweet(secondArrow);

      }, [props.priceChangeYesterday]);

     return (

       <div className="fullsidebar">

         <div className="currentinfo">

           <h2 className="date">{props.date}</h2>
           <h1 className="price">{props.price}</h1>


           <div className="priceChangeBox">
             {firstArrow}
           <h2 className="priceChangeYesterday">{props.priceChangeYesterday.substring(1) + " since yesterday"}</h2>
            {secondArrow}
           <h2 className="priceChangeLastTweet">{props.priceChangeTweet.substring(1) + " since last tweet"}</h2>
           </div>


           <div className="tweetBox">
             <h2 className="topTweet">Top Elon Tweet of that Day:</h2>
               <TweetEmbed id={props.tweetID} />
           </div>

     </div>

   </div>

   );

   }

 export default Sidebar;
