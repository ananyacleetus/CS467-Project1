import React, {useState} from "react";

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

           <h2 className="priceChangeYesterday">$14.02 since yesterday</h2>
           <h2 className="priceChangeLastTweet">$2.96 since last tweet</h2>

     </div>

   </div>

   );

   }

 export default Sidebar;
