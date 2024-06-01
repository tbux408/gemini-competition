import React from "react";
import "./GameBlock.css";
import { Typography, Button } from "@mui/material";

function GameBlock({ message, index }) {
  return (
    <div>
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
          {message.content
            .split(" ")
            .filter((x) => !x.includes("DONE"))
            .slice(1)
            .join(" ")}
        </div>
      )}
    </div>
  );
}

export default GameBlock;
