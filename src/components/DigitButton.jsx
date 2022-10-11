import { action } from "../App";

export const DigitButton = ({ dispatch, digit }) => {
  return (
    <button onClick={() => dispatch({ type: action.add, payload: { digit } })}>
      {digit}
    </button>
  );
};
