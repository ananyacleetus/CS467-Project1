import React from "react";

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import drawChart from "/lib/chart.js";

//stylesheet
import "..//css/scalebar.css";

function Scalebar(props) {

    const [timeScale, setTimeScale] = React.useState('1yr');

    const handleTimeScale = (event, newTimeScale) => {

        setTimeScale(newTimeScale);

        props.onChangeTimeScale(newTimeScale);
    };

    return React.createElement(
        "div",
        { className: "fullscalebar" },
        React.createElement(
            ToggleButtonGroup,
            {
                className: "buttonbar",
                value: timeScale,
                onChange: handleTimeScale,
                variant: "contained",
                color: "primary",
                "aria-label": "contained primary button group",
                exclusive: true
            },
            React.createElement(
                ToggleButton,
                { value: "all" },
                "All Time"
            ),
            React.createElement(
                ToggleButton,
                { value: "3yr" },
                "3 Years"
            ),
            React.createElement(
                ToggleButton,
                { value: "1yr" },
                "1 Year"
            ),
            React.createElement(
                ToggleButton,
                { value: "3mo" },
                "3 Months"
            ),
            React.createElement(
                ToggleButton,
                { value: "1mo" },
                "1 Month"
            )
        )
    );
}

export default Scalebar;