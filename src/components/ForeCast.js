import React from "react";
import { useStyles } from "../muiStyled/muiStyles";
import { Card } from "@mui/material";

function ForeCast({ forecast, day }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className="forecasr-day">{day}</div>
      <div className="forecast-temp">
        {forecast.Temperature.Maximum.Value} {forecast.Temperature.Maximum.Unit}{" "}
      </div>
    </Card>
  );
}

export default ForeCast;
