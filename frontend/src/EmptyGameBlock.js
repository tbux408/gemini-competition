import React from "react";
import "./EmptyGameBlock.css";
import { Typography, Button } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function EmptyGameBlock({ i, success, failure }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  return (
    <div>
      <div className="">
        {i % 5 === 0 && i !== 0 && !success && !failure ? (
          <div className="hint-block">
            <Typography variant="subtitle1" color="text.main">
              Question {i + 1}
            </Typography>
            <QuestionMarkIcon style={{ color: "#434A42" }} />
          </div>
        ) : hoveredIndex === i ? (
          <div
            className="hint-block"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <Typography variant="subtitle1" color="text.main">
              Question {i + 1}
            </Typography>
          </div>
        ) : (
          <div
            className="empty-block"
            onClick={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          ></div>
        )}
      </div>
    </div>
  );
}

export default EmptyGameBlock;
