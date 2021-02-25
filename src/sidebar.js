import React, {useState} from "react";

 //stylesheet
 import "..//css/sidebar.css";


 function Sidebar (props) {

   const [price, setPrice] = useState(null);
   const [date, setDate] = useState(null);

     return (

       <div className="fullsidebar">

         <div className="currentinfo">
           <h2 className="date">test1</h2>
           <h1 className="price">test2</h1>
     </div>

   </div>

   );

   }

 export default Sidebar;
