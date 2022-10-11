import { action } from "../App";

export const OperationButton = ({ operation, dispatch }) => {
  return (
    <button
      onClick={() => dispatch({ type: action.choose, payload: { operation } })}
    >
      {operation}
    </button>
  );
};
