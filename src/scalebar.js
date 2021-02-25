import React from "react";

import { Button, ButtonGroup} from '@material-ui/core';

 //stylesheet
 import "..//css/scalebar.css";


 function Scalebar () {

     return (
     <div>
     <h1 className="name">Insert Scale Here</h1>
     <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
       <Button>One</Button>
       <Button>Two</Button>
       <Button>Three</Button>
     </ButtonGroup>

</div>

   );

   }


 export default Scalebar;
