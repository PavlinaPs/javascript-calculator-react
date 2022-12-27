import React from "react";
import "./Display.css";

const Display = (props) => {
  return (
    <div className="display-container">
      <div id="expression" className="display--expression">
        {props.expressionDisplay}
      </div>
      <div id="display" className="display--current">
        {props.currentDisplay}
      </div>
    </div>
  );
};

export default Display;
