import React from "react";
import { ACTIONS } from "../App";
export default function Header({ dispatch }) {
  return (
    <div className="header">
      <p>Budgets</p>
      <div className="header-buttons-block">
        <button
          className="button-add-budget"
          onClick={() => dispatch({ type: ACTIONS.NEW_BUDGET })}
        >
          Add budget
        </button>
        <button
          className="button-add-expense"
          onClick={() => dispatch({ type: ACTIONS.NEW_EXPENSE })}
        >
          Add expense
        </button>
      </div>
    </div>
  );
}
