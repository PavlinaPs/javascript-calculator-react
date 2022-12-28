import React from "react";
import "./Keypad.css";
import ACTIONS from "../../useReducer/actionTypes";

const Keypad = ({ dispatch }) => {
  return (
    <div className="keypad-container">
      <button
        id="clear"
        className="button button--clear"
        onClick={() =>
          dispatch({
            type: ACTIONS.CLEAR,
          })
        }
      >
        CA
      </button>
      <button
        id="divide"
        className="button button--operator"
        onClick={() => dispatch({ type: ACTIONS.OPERATOR, payload: "/" })}
      >
        /
      </button>
      <button
        id="multiply"
        className="button button--operator"
        onClick={() => dispatch({ type: ACTIONS.OPERATOR, payload: "*" })}
      >
        *
      </button>
      <button
        id="seven"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "7" })}
      >
        7
      </button>
      <button
        id="eight"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "8" })}
      >
        8
      </button>
      <button
        id="nine"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "9" })}
      >
        9
      </button>
      <button
        id="subtract"
        className="button button--operator"
        onClick={() => dispatch({ type: ACTIONS.OPERATOR, payload: "-" })}
      >
        -
      </button>
      <button
        id="four"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "4" })}
      >
        4
      </button>
      <button
        id="five"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "5" })}
      >
        5
      </button>
      <button
        id="six"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "6" })}
      >
        6
      </button>
      <button
        id="add"
        className="button button--operator"
        onClick={() => dispatch({ type: ACTIONS.OPERATOR, payload: "+" })}
      >
        +
      </button>
      <button
        id="one"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "1" })}
      >
        1
      </button>
      <button
        id="two"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "2" })}
      >
        2
      </button>
      <button
        id="three"
        className="button button--digit"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "3" })}
      >
        3
      </button>
      <button
        id="equals"
        className="button button--equals"
        onClick={() => dispatch({ type: ACTIONS.EQUALS, payload: "=" })}
      >
        =
      </button>
      <button
        id="zero"
        className="button button--zero"
        onClick={() => dispatch({ type: ACTIONS.DIGIT, payload: "0" })}
      >
        0
      </button>
      <button
        id="decimal"
        className="button button--decimal"
        onClick={() => dispatch({ type: ACTIONS.DECIMAL, payload: "." })}
      >
        .
      </button>
    </div>
  );
};

export default Keypad;
