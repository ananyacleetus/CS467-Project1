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

// import * as Key from '..//assets/key.png';


import drawChart from "/lib/chart.js";


//stylesheet
import "..//css/selectionbar.css";


function SelectionBar(props) {

  const [stockState, setStockState] = React.useState({
  tsla: true,
  etsy: false,
  gme: false,
  gm: false,
  btcusd: false,
});

const handleChange = (event) => {
    setStockState({ ...stockState, [event.target.name]: event.target.checked });
    props.onChangeStockState({ ...stockState, [event.target.name]: event.target.checked });
  };


  const { tsla, etsy, gme, gm, btcusd} = stockState;

  const error = [tsla, etsy, gme, gm, btcusd].filter((v) => v).length == 0;

    return (
        <div className="fullselectionbar">

          <h4 className="instructions">Hover over a point to view the current stock price and changes in price.</h4>

          <h4 className="instructions">Hover over a vertical line to see a tweet, engagement, and sentiment of the tweet.</h4>

          <h4 className="instructions">Check and un-check boxes to compare multiple relevant stocks. At least one stock must be selected.</h4>

          <div className="stockselection">

          <FormControl required error={error} component="fieldset" className="stockformcontrol">
            <FormLabel component="legend">Select stock(s)</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={tsla} onChange={handleChange} name="tsla" className="tslaBox"/>}

                label="TSLA (Tesla)"
              />
              <FormControlLabel
                control={<Checkbox checked={etsy} onChange={handleChange} name="etsy" className="etsyBox"/>}
                label="ETSY (Etsy)"
              />
              <FormControlLabel
                control={<Checkbox checked={gme} onChange={handleChange} name="gme" className="gmeBox"/>}
                label="GME (Gamestop)"
              />
              <FormControlLabel
                control={<Checkbox checked={gm} onChange={handleChange} name="gm" className="gmBox"/>}
                label="GM (General Motors)"
              />

            </FormGroup>
            <FormHelperText>Please select at least one option</FormHelperText>
          </FormControl>
          </div>

          <div className="engagementKey">
          <img src="/lib/assets/engkey.png"/>
          </div>

        </div>

    );

}


export default SelectionBar;
