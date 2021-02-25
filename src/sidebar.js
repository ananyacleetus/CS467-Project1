import React, {useState} from "react";
import { Icon } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

 //stylesheet
 import "..//css/sidebar.css";


 function Sidebar (props) {

   // const [price, setPrice] = useState(null);
   // const [date, setDate] = useState(null);

     return (

       <div className="fullsidebar">

         <div className="currentinfo">

           <h2 className="date">{props.date}</h2>
           <h1 className="price">{"$" + props.price}</h1>


           <div className="priceChangeBox">
           <ArrowDropUp className="arrowup"/>
           <h2 className="priceChangeYesterday">$14.02 since yesterday</h2>
            <ArrowDropDown className="arrowdown"/>
           <h2 className="priceChangeLastTweet">$2.96 since last tweet</h2>
           </div>

     </div>

   </div>

   );

   }

 export default Sidebar;
