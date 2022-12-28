import ACTIONS from "./actionTypes";

function reducer(state, { type, payload }) {
  let editedExpression;
  let result;

  switch (type) {
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
      // multiple zeros at the beginning of an operand not allowed
      if (payload === "0" && state.currentOperand === "0") {
        return state;
      }
      // adds another digit to an operand, overwrite flag is off
      if (payload.match(/\d/) && state.overwrite === false) {
        return {
          ...state,
          expression: `${state.expression}${payload}`,
          currentOperand: `${state.currentOperand || ""}${payload}`,
          expressionDisplay: `${state.expression}${payload}`,
          currentDisplay: `${state.currentOperand || ""}${payload}`,
        };
      }

      // starts a new operand, overwrite flag is on
      if (payload.match(/\d/) && state.overwrite) {
        return {
          ...state,
          expression: `${state.expression || ""}${payload}`,
          currentOperand: `${payload}`,
          expressionDisplay: `${state.expression || ""}${payload}`,
          currentDisplay: `${payload}`,
          overwrite: false,
        };
      }
      break;
    }

    case ACTIONS.DECIMAL: {
      // only one decimal allowed
      if (state.currentOperand.indexOf(".") === -1) {
        return {
          ...state,
          expression: `${state.expression}${payload}`,
          currentOperand: `${state.currentOperand || ""}${payload}`,
          expressionDisplay: `${state.expression}${payload}`,
          currentDisplay: `${state.currentOperand || ""}${payload}`,
        };
      } else {
        return state;
      }
    }
    case ACTIONS.OPERATOR: {
      //// multiple consecutive operators entered
      // 3rd operator entered
      if (
        state.expression.charAt(state.expression.length - 2).match(/[-+*/]/) &&
        state.expression.charAt(state.expression.length - 1).match(/[-+*/]/) &&
        payload.match(/[+*/]/)
      ) {
        return {
          ...state,
          expression: `${state.expression.slice(0, -2)}${payload}`,
          currentOperand: `${payload}`,
          expressionDisplay: `${state.expression.slice(0, -2)}${payload}`,
          currentDisplay: `${payload}`,
        };
      }
      // previous operator is -, clicked + or * or /
      if (
        state.expression.charAt(state.expression.length - 1).match(/[-]/) &&
        payload.match(/[+*/]/)
      ) {
        return {
          ...state,
          expression: `${state.expression.slice(0, -1)}${payload}`,
          currentOperand: `${payload}`,
          expressionDisplay: `${state.expression.slice(0, -1)}${payload}`,
          currentDisplay: `${state.currentOperand}`,
        };
      }
      // entering negative number after an operator
      if (
        state.expression.charAt(state.expression.length - 1).match(/[-+*/]/) &&
        payload.match(/-/)
      ) {
        return {
          ...state,
          expression: `${state.expression}${payload}`,
          currentOperand: `${payload}`,
          expressionDisplay: `${state.expression}${payload}`,
          currentDisplay: `${payload}`,
        };
      }
      // consecutive operators other than -
      if (
        state.expression.charAt(state.expression.length - 1).match(/[+*/]/) &&
        payload.match(/[+*/]/)
      ) {
        return {
          ...state,
          expression: `${state.expression.slice(0, -1)}${payload}`,
          currentOperand: `${payload}`,
          expressionDisplay: `${state.expression.slice(0, -1)}${payload}`,
          currentDisplay: `${payload}`,
        };
      }

      // result is the first operand of a new operation
      if (
        payload.match(/[-+*/]/) &&
        state.operandAfterEval !== "" &&
        state.expression === ""
      ) {
        return {
          ...state,
          expression: `${state.operandAfterEval}${payload}`,
          currentOperand: `${state.operandAfterEval}${payload}`,
          expressionDisplay: `${state.operandAfterEval}${payload}`,
          currentDisplay: `${state.operandAfterEval}${payload}`,
          operandAfterEval: "",
        };
      }

      // to complete an operand
      if (payload.match(/[-+*/]/)) {
        return {
          ...state,
          expression: `${state.expression}${payload}`,
          expressionDisplay: `${state.expression}${payload}`,
          currentDisplay: `${payload}`,
          overwrite: true,
        };
      }
      break;
    }

    case ACTIONS.EQUALS: {
      // if "=" is clicked after an operator
      if (
        state.expression.charAt(state.expression.length - 1).match(/[-+*/]/) &&
        payload === "="
      ) {
        return state;
      }

      // to fix the issue of two consecutive minuses - all consecutive minuses changes to plus
      if (/[--]/g.test(state.expression)) {
        editedExpression = state.expression;
        while (editedExpression.includes("--")) {
          editedExpression = editedExpression.replace("--", "+");
        }
      }

      // check expression before eval for only allowed characters
      if (/[\d./*+-=]*/.test(state.expression) === false) {
        return state;
      }

      // check edited expression before eval for only allowed characters
      if (/[\d./*+-=]*/.test(editedExpression) === false) {
        return state;
      }

      editedExpression
        ? // eslint-disable-next-line
          (result = parseFloat(eval(editedExpression)))
        : // eslint-disable-next-line
          (result = parseFloat(eval(state.expression)));
      // to compensate for JavaScript floats' computation issue
      let resultRounded = (
        Math.round(1000000000000 * result) / 1000000000000
      ).toString();
      return {
        ...state,
        expression: "",
        overwrite: true,
        operandAfterEval: resultRounded,
        expressionDisplay: `${state.expression}${payload}${resultRounded}`,
        currentDisplay: resultRounded,
      };
    }
    default:
      throw Error("Unknown action: " + type);
  }
}

export { ACTIONS };
export default reducer;
