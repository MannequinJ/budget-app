import React from "react";
import ProgressBar from "./ProgressBar";
import { ACTIONS } from "../App";

export default function Budget({ data, dispatch }) {
  let currentSpending;
  let bgcolor;
  let fillPercent;
  if (data.expenses.length === 0) {
    currentSpending = 0;
  } else {
    currentSpending = data.expenses.reduce(
      (acc, expense) => acc + +expense.expenseAmount,
      0
    );
  }
  if (currentSpending == 0) {
    fillPercent = 0;
    bgcolor = "blue";
  } else {
    fillPercent = (currentSpending / +data.maxSpending) * 100;
    if (fillPercent > 10 && fillPercent < 50) {
      bgcolor = "green";
    } else if (fillPercent > 50 && fillPercent < 90) {
      bgcolor = "yellow";
    } else if (fillPercent >= 90) {
      bgcolor = "red";
    } else {
      bgcolor = "blue";
    }
  }
  return (
    <div className="budget" id={data.id}>
      <div className="budget-header">
        <p>{data.budgetName}</p>
        <div className="spendings">
          <p className="current-budget">${currentSpending}</p>
          <p className="default-budget">/${data.maxSpending}</p>
        </div>
      </div>
      <ProgressBar completed={fillPercent} bgcolor={bgcolor} />
      <div className="budget-buttons-block">
        <button
          className="button-add-expense"
          onClick={() =>
            dispatch({ type: ACTIONS.NEW_EXPENSE, payload: { id: data.id } })
          }
        >
          Add Expense
        </button>
        <button
          className="button-view-expense"
          onClick={() => {
            dispatch({
              type: ACTIONS.SHOW_EXPENSES,
              payload: { id: data.id },
            });
          }}
        >
          View Expenses
        </button>
      </div>
    </div>
  );
}
