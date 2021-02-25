import React from "react";

import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import { Icon } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';


 //stylesheet
 import "..//css/scalebar.css";


 function Scalebar () {

     return (
     <div className="fullscalebar">
     <ToggleButtonGroup className="buttonbar" variant="contained" color="primary" aria-label="contained primary button group" exclusive={true}>
       <ToggleButton value="all">All Time</ToggleButton>
       <ToggleButton value="3yr">3 Years</ToggleButton>
       <ToggleButton value="1yr">1 Year</ToggleButton>
       <ToggleButton value="1mo">1 Month</ToggleButton>
       <ToggleButton value="1dy">1 Day</ToggleButton>
     </ToggleButtonGroup>

</div>

   );

   }


 export default Scalebar;
