import React, { useReducer } from "react";
import "./App.css";
import Keypad from "../Keypad/Keypad";
import Display from "../Display/Display";
import Footer from "../Footer/Footer";
import reducer from "../../useReducer/reducer";

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
      <header>
        <h1 className="title">JavaScript Calculator</h1>
      </header>
      <main className="App">
        <Display
          expressionDisplay={state.expressionDisplay}
          currentDisplay={state.currentDisplay}
        />
        <Keypad dispatch={dispatch} />
      </main>
      <Footer />
    </>
  );
}

export default App;
