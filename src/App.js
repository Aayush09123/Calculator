import { useReducer } from "react";
import { DigitButton } from "./components/DigitButton";
import { OperationButton } from "./components/OperationButton";
import "./components/styles.css";
import "./App.css";

export const action = {
  add: "add",
  clear: "clear",
  delete: "delete",
  evaluate: "evaluate",
  choose: "choose",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "add":
      if (state.overwrite) {
        return {
          ...state,
          current: payload.digit,
        };
      }
      if (payload.digit === "0" && state.current === "0") return state;
      if (payload.digit === "." && state.current.includes(".")) return state;
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };

    case "choose":
      if (state.current == null && state.previous == null) return state;
      if (state.current == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previous == null) {
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        };
      }
      return {
        ...state,
        previous: evaluate(state),
        operation: payload.operation,
        current: null,
      };

    case "clear":
      return {};

    case "delete":
      if (state.current == null) return state;
      if (state.current.length === 1) {
        return {
          ...state,
          current: null,
        };
      }
      return {
        ...state,
        current: state.current.slice(0, -1),
      };

    case "evaluate":
      if (
        state.operation == null ||
        state.previous == null ||
        state.current == null
      )
        return state;
      return {
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state),
      };
  }
}

function evaluate({ current, previous, operation }) {
  const prev = parseFloat(previous);
  const cur = parseFloat(current);
  if (isNaN(prev) || isNaN(cur)) return "";

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + cur;
      break;
    case "*":
      computation = prev * cur;
      break;
    case "-":
      computation = prev - cur;
      break;
    case "÷":
      computation = prev / cur;
      break;
  }
  return computation.toString();
}

function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});
  return (
    <div className="App">
      <div className="output">
        <div className="previous">
          {previous} {operation}
        </div>
        <div className="current">{current}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: action.clear })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: action.delete })}>DEL</button>

      <OperationButton operation="÷" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperationButton operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />

      <OperationButton operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: action.evaluate })}
      >
        {" "}
        ={" "}
      </button>
    </div>
  );
}

export default App;
