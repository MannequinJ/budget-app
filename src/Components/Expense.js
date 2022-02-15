import React from "react";
import { ACTIONS } from "../App";

export default function Expense({ dispatch, data, expense }) {
  // console.log(data);
  // console.log(expense);
  return (
    <div className="expense">
      <p>{expense.expenseDescription}</p>
      <div className="expense-amount-btn-block">
        <button
          className="button-add-budget"
          onClick={() => {
            // console.log(expense);
            dispatch({ type: ACTIONS.CHANGE_BUDGET, payload: expense });
          }}
        >
          Change budget
        </button>
        <p>${expense.expenseAmount}</p>
        <button
          className="close"
          onClick={() => {
            // console.log(data.id);
            dispatch({
              type: ACTIONS.DELETE_EXPENSE,
              payload: {
                expenseId: expense.id,
                budgetId: data.id,
                uncategorized: data.uncategorized,
              },
            });
          }}
        ></button>
      </div>
    </div>
  );
}
