import React from "react";
import { Typography, Button } from "@mui/material";
import GameBlock from "./GameBlock.js";


function Game({ messages }) {
  return (
    <div style={{padding:'5rem'}}>
      {messages.map((message, key) => (
        <GameBlock key={key} message={message} index={key}/>
      ))}
    </div>
  );
}

export default Game;
