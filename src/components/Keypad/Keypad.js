import React from "react";
import "./Keypad.css";
import ACTIONS from "../../useReducer/actionTypes";
import buttons from "./buttons";

const Keypad = ({ dispatch }) => {
  return (
    <div className="keypad-container">
      {buttons.map((button) => (
        <button
          key={button.key}
          id={button.id}
          className={button.className}
          onClick={() => {
            switch (button.dispatchIndicator) {
              case "DIGIT":
                return dispatch({
                  type: ACTIONS.DIGIT,
                  payload: button.display,
                });
              case "DECIMAL":
                return dispatch({
                  type: ACTIONS.DECIMAL,
                  payload: button.display,
                });
              case "OPERATOR":
                return dispatch({
                  type: ACTIONS.OPERATOR,
                  payload: button.display,
                });
              case "CLEAR":
                return dispatch({
                  type: ACTIONS.CLEAR,
                });
              case "EQUALS":
                return dispatch({
                  type: ACTIONS.EQUALS,
                  payload: button.display,
                });
              default:
                throw Error("Unknown action: " + button.dispatchIndicator);
            }
          }}
        >
          {button.display}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
