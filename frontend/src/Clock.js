import "./Clock.css";
import React from "react";
import { Typography, Button } from "@mui/material";

function Clock() {
  const date = new Date();

  return (
    <div className="date-container">
      <div className="date-square">{date.getMonth() + 1}</div>
      <div className="date-square">{date.getDate()}</div>
      <div className="date-square">{date.getFullYear()}</div>
    </div>
  );
}

export default Clock;
