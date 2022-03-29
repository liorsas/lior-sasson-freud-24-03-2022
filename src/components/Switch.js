import * as React from "react";
import Switch from "@mui/material/Switch";

export default function ButtonAppBar({ change, checked }) {
  return (
    <Switch
      color="default"
      inputProps={{ "aria-label": "checkbox with default color" }}
      onChange={change}
      checked={checked}
    />
  );
}
