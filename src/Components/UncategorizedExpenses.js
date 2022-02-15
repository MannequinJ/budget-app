import React from "react";
import { ACTIONS } from "../App";
export default function UncategorizedExpenses({ data, dispatch }) {
  let currentSpending;
  if (data.expenses.length === 0) {
    currentSpending = 0;
  } else {
    currentSpending = data.expenses.reduce(
      (acc, expense) => acc + +expense.expenseAmount,
      0
    );
  }
  return (
    <div className="budget">
      <div className="budget-header">
        <p>Uncategorized</p>
        <div className="spendings">
          <p className="current-budget">${currentSpending}</p>
        </div>
      </div>
      <div className="budget-buttons-block">
        <button
          className="button-add-expense"
          onClick={() =>
            dispatch({
              type: ACTIONS.NEW_EXPENSE,
              payload: { uncategorizedExpensesId: data.id },
            })
          }
        >
          Add Expense
        </button>
        <button
          className="button-view-expense"
          onClick={() => {
            dispatch({
              type: ACTIONS.SHOW_EXPENSES,
              payload: { uncategorizedExpensesId: data.id },
            });
          }}
        >
          View Expenses
        </button>
      </div>
    </div>
  );
}
