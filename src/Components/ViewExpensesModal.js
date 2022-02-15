import React from "react";
import Expense from "./Expense";
import { ACTIONS } from "../App";
export default function ViewExpensesModal({ data, dispatch }) {
  // console.log(data);
  const expenseElements = data.expenses.map((expense) => (
    <Expense
      key={expense.id}
      data={data}
      dispatch={dispatch}
      expense={expense}
    />
  ));
  return (
    <div className="modal">
      <div className="expenses-list">
        <div className="expenses-header">
          <div className="expenses-header-name-btn">
            <p>Expenses - {data.budgetName}</p>
            {data.uncategorized || (
              <button
                className="delete-budget-button"
                onClick={() =>
                  dispatch({ type: ACTIONS.DELETE_BUDGET, payload: data.id })
                }
              >
                Delete
              </button>
            )}
          </div>
          <button
            className="close"
            onClick={() => dispatch({ type: ACTIONS.SHOW_EXPENSES })}
          ></button>
        </div>
        {expenseElements}
      </div>
    </div>
  );
}
