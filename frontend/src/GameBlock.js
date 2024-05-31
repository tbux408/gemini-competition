import React from "react";
import "./GameBlock.css";
import { Typography, Button } from "@mui/material";

function GameBlock({ message, index }) {
  return (
    <div className="container">
      <div style={{ width: "50%" }}>
        {message.type === "user" ? (
          <div className="user-block">
            <Typography variant="h3" color="text.main">
              {message.content}
            </Typography>
          </div>
        ) : (
          <div className="model-block">
            <Typography variant="h3" color="text.main">
              {message.content.split(" ")[0]}
            </Typography>
            {message.content.split(" ").slice(1).join(" ")}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameBlock;
