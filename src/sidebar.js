import React, {useState} from "react";
import { Icon } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

 //stylesheet
 import "..//css/sidebar.css";


 function Sidebar (props) {
     return (

       <div className="fullsidebar">

         <div className="currentinfo">

           <h2 className="date">{props.date}</h2>
           <h1 className="price">{props.price}</h1>


           <div className="priceChangeBox">
           <ArrowDropUp className="arrowup"/>
           <h2 className="priceChangeYesterday">{props.priceChangeYesterday + " since yesterday"}</h2>
            <ArrowDropDown className="arrowdown"/>
           <h2 className="priceChangeLastTweet">{props.priceChangeTweet + " since last tweet"}</h2>
           </div>


           <div className="tweetBox">
             <h2>Insert Embedly Tweet Here</h2>

           </div>

     </div>

   </div>

   );

   }

 export default Sidebar;
