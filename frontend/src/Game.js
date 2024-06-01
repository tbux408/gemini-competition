import React from "react";
import { Typography, Button } from "@mui/material";
import GameBlock from "./GameBlock.js";
import EmptyGameBlock from "./EmptyGameBlock.js";
import LinearProgress from "@mui/material/LinearProgress";

import "./Game.css";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function Game({ messages, sendMessage, setMessages, success, failure }) {
  const [inputValue, setInputValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setDisabled(true);
      if (inputValue !== "") {
        setMessages([...messages, { content: inputValue, type: "user" }]);
        sendMessage(inputValue, setDisabled);
      }
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: "1.2rem" }}>
      <div className="container">
        <div style={{ width: `min(100%, 35rem)` }}>
          {messages.map((message, key) => (
            <GameBlock key={key} message={message} index={key} />
          ))}
          {messages.length > 0 &&
          messages[messages.length - 1].type === "user" ? (
            <div className="model-block">
              <LinearProgress color="primary" />
            </div>
          ) : null}

          {disabled || success || failure ? null : (
            <div className="input-block">
              {Math.floor(messages.length / 2) % 5 === 0 &&
              messages.length !== 0 ? (
                <>
                  <input
                    className="input-field"
                    placeholder="Ask a question..."
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    maxlength="55"
                  ></input>
                  <QuestionMarkIcon style={{ color: "#434A42" }} />
                </>
              ) : (
                <input
                  className="input-field"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  maxlength="55"
                ></input>
              )}
            </div>
          )}

          {Array.from(
            { length: 19 - Math.floor(messages.length / 2) },
            (_, i) => (
              <EmptyGameBlock
                i={i + Math.floor(messages.length / 2) + 1}
                key={i}
                success={success}
                failure={failure}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
