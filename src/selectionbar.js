import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';


import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import drawChart from "/lib/chart.js";


//stylesheet
import "..//css/selectionbar.css";


function SelectionBar(props) {

  const [stockState, setStockState] = React.useState({
  tsla: true,
  etsy: false,
  gme: false,
  sigl: false,
  btcusd: false,
});

const handleChange = (event) => {
    setStockState({ ...stockState, [event.target.name]: event.target.checked });
    props.onChangeStockState({ ...stockState, [event.target.name]: event.target.checked });
  };

  const { tsla, etsy, gme, sigl, btcusd} = stockState;

  const error = [tsla, etsy, gme, sigl, btcusd].filter((v) => v).length == 0;

    return (
        <div className="fullselectionbar">

          <div className="stockselection">

          <FormControl required error={error} component="fieldset" className="stockformcontrol">
            <FormLabel component="legend">Select stock(s)</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={tsla} onChange={handleChange} name="tsla" className="tslaBox"/>}
                label="TSLA"
              />
              <FormControlLabel
                control={<Checkbox checked={etsy} onChange={handleChange} name="etsy" className="etsyBox"/>}
                label="ETSY"
              />
              <FormControlLabel
                control={<Checkbox checked={gme} onChange={handleChange} name="gme" className="gmeBox"/>}
                label="GME"
              />
              <FormControlLabel
                control={<Checkbox checked={sigl} onChange={handleChange} name="sigl" className="siglBox"/>}
                label="SIGL"
              />

            </FormGroup>
            <FormHelperText>Please select at least one option</FormHelperText>
          </FormControl>
          </div>

        </div>

    );

}


export default SelectionBar;
