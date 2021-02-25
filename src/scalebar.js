import React from "react";

import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';

 //stylesheet
 import "..//css/scalebar.css";


 function Scalebar () {

     return (
     <div className="fullscalebar">
     <ToggleButtonGroup className="buttonbar" variant="contained" color="primary" aria-label="contained primary button group" exclusive="true">
       <ToggleButton>All Time</ToggleButton>
       <ToggleButton>3 Years</ToggleButton>
       <ToggleButton>1 Year</ToggleButton>
       <ToggleButton>1 Month</ToggleButton>
       <ToggleButton>1 Day</ToggleButton>
     </ToggleButtonGroup>

</div>

   );

   }


 export default Scalebar;
