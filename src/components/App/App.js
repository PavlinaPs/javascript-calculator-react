import React from "react";
import { useReducer } from "react";
import "./App.css";
import Keypad from "../Keypad/Keypad";
import Display from "../Display/Display";

export const ACTIONS = {
  CLEAR: "clear",
  DECIMAL: "decimal",
  OPERATOR: "operator",
  DIGIT: "digit",
  EQUALS: "equals",
};

function reducer(state, actions) {
  switch (actions.type) {
    case ACTIONS.CLEAR: {
      return {
        ...state,
        expression: "",
        currentOperand: "",
        overwrite: false,
        operandAfterEval: "",
        expressionDisplay: "",
        currentDisplay: "0",
      };
    }
    case ACTIONS.DIGIT: {
      if (actions.payload === "0" && state.currentOperand === "0") {
        return state;
      }
      // adds another digit to an operand, overwrite flag is off
      if (actions.payload.match(/[\d]/) && !state.overwrite) {
        return {
          ...state,
          expression: `${state.expression}${actions.payload}`,
          currentOperand: `${state.currentOperand || ""}${actions.payload}`,
          expressionDisplay: `${state.expression}${actions.payload}`,
          currentDisplay: `${state.currentOperand || ""}${actions.payload}`,
        };
      }

      // starts a new operand, overwrite flag is on
      if (actions.payload.match(/[\d]/) && state.overwrite) {
        return {
          ...state,
          expression: `${state.expression || ""}${actions.payload}`,
          currentOperand: `${actions.payload}`,
          expressionDisplay: `${state.expression || ""}${actions.payload}`,
          currentDisplay: `${actions.payload}`,
          overwrite: false,
        };
      }
      break;
    }
    case ACTIONS.DECIMAL: {
      if (state.currentOperand.indexOf(".") === -1) {
        return {
          ...state,
          expression: `${state.expression}${actions.payload}`,
          currentOperand: `${state.currentOperand || ""}${actions.payload}`,
          expressionDisplay: `${state.expression}${actions.payload}`,
          currentDisplay: `${state.currentOperand || ""}${actions.payload}`,
        };
      } else {
        return state;
      }
    }
    case ACTIONS.OPERATOR: {
      //// multiple consecutive operators entered
      // 3rd operator entered
      if (
        state.expression
          .charAt(state.expression.length - 2)
          .match(/[\-\+\*\/]/) &&
        state.expression
          .charAt(state.expression.length - 1)
          .match(/[\-\+\*\/]/) &&
        actions.payload.match(/[\+\*\/]/)
      ) {
        return {
          ...state,
          expression: `${state.expression.slice(0, -2)}${actions.payload}`,
          currentOperand: `${actions.payload}`,
          expressionDisplay: `${state.expression.slice(0, -2)}${
            actions.payload
          }`,
          currentDisplay: `${actions.payload}`,
        };
      }
      // previous operator is -, clicked + or * or /
      if (
        state.expression.charAt(state.expression.length - 1).match(/[\-]/) &&
        actions.payload.match(/[\+\*\/]/)
      ) {
        return {
          ...state,
          expression: `${state.expression.slice(0, -1)}${actions.payload}`,
          currentOperand: `${actions.payload}`,
          expressionDisplay: `${state.expression.slice(0, -1)}${
            actions.payload
          }`,
          currentDisplay: `${state.currentOperand}`,
        };
      }
      // entering negative number after an operator
      if (
        state.expression
          .charAt(state.expression.length - 1)
          .match(/[\-\+\*\/]/) &&
        actions.payload.match(/[\-]/)
      ) {
        return {
          ...state,
          expression: `${state.expression}${actions.payload}`,
          currentOperand: `${actions.payload}`,
          expressionDisplay: `${state.expression}${actions.payload}`,
          currentDisplay: `${actions.payload}`,
        };
      }
      // consecutive operators other than -
      if (
        state.expression
          .charAt(state.expression.length - 1)
          .match(/[\+\*\/]/) &&
        actions.payload.match(/[\+\*\/]/)
      ) {
        return {
          ...state,
          expression: `${state.expression.slice(0, -1)}${actions.payload}`,
          currentOperand: `${actions.payload}`,
          expressionDisplay: `${state.expression.slice(0, -1)}${
            actions.payload
          }`,
          currentDisplay: `${actions.payload}`,
        };
      }

      // result is the first operand of a new operation
      if (
        actions.payload.match(/[\-\+\*\/]/) &&
        state.operandAfterEval !== "" &&
        state.expression === ""
      ) {
        return {
          ...state,
          expression: `${state.operandAfterEval}${actions.payload}`,
          currentOperand: `${state.operandAfterEval}${actions.payload}`,
          expressionDisplay: `${state.operandAfterEval}${actions.payload}`,
          currentDisplay: `${state.operandAfterEval}${actions.payload}`,
          operandAfterEval: "",
        };
      }

      // to complete an operand
      if (actions.payload.match(/[\-\+\*\/]/)) {
        return {
          ...state,
          expression: `${state.expression}${actions.payload}`,
          expressionDisplay: `${state.expression}${actions.payload}`,
          currentDisplay: `${actions.payload}`,
          overwrite: true,
        };
      }

      // if "=" is clicked after an operator
      if (
        state.expression
          .charAt(state.expression.length - 1)
          .match(/[\-\+\*\/]/) &&
        actions.payload === "="
      ) {
        return state;
      }
      break;
    }
    case ACTIONS.EQUALS: {
      if (actions.payload === "=") {
        // to fix the issue of two consecutive minuses
        if (/(--)/.test(state.expression)) {
          let editedExpression = state.expression.replace(/--/, "+");
          state.expression = editedExpression;
        }
        let result = parseFloat(eval(state.expression));
        // to compensate for JavaScript floats' computation issue
        let resultRounded = (
          Math.round(1000000000000 * result) / 1000000000000
        ).toString();
        return {
          ...state,
          expression: "",
          overwrite: true,
          operandAfterEval: resultRounded,
          expressionDisplay: `${state.expression}${actions.payload}${resultRounded}`,
          currentDisplay: resultRounded,
        };
      }
      break;
    }
    default:
      throw Error("Unknown action: " + actions.type);
  }
}

const initialState = {
  expression: "",
  currentOperand: "",
  overwrite: false,
  operandAfterEval: "",
  expressionDisplay: "",
  currentDisplay: "0",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <main className="App">
        <Display
          expressionDisplay={state.expressionDisplay}
          currentDisplay={state.currentDisplay}
        />
        <Keypad dispatch={dispatch} />
      </main>
      <footer>
        Coded by &nbsp;
        <a href="http://">Pavlina Psarsky</a>
      </footer>
    </>
  );
}

export default App;
