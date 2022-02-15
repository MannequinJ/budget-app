import React from "react";
import { ACTIONS } from "../App";

export default function ChangeBudgetModal({ dispatch, data }) {
  //
  // cut expense by id from currentBudget and add to new budget by budget name
  //
  console.log(data.currentExpense);
  return (
    <div className="modal">
      <div className="change-budget">
        <div className="new-budget-header">
          <p>ExpenseName</p>
          <button
            className="close"
            onClick={() => dispatch({ type: ACTIONS.CHANGE_BUDGET })}
          ></button>
        </div>
        <form className="new-budget-form">
          <select
            className="new-expense-select"
            name="expenseBudget"
            value={data.currentExpense.expenseBudget}
            onChange={(e) => {
              console.log(e.target[e.target.selectedIndex].id);
              dispatch({
                type: ACTIONS.CHANGE_CURRENT_EXPENSE_BUDGET,
                payload: e.target[e.target.selectedIndex].id,
              });
            }}
          >
            <option
              id={data.uncategorizedExpenses.id}
              value={data.uncategorizedExpenses.id}
            >
              Uncategorized
            </option>
            {data.budgetsList.map((budget) => {
              return (
                <option key={budget.id} id={budget.id} value={budget.id}>
                  {budget.budgetName}
                </option>
              );
            })}
          </select>
          <button
            className="button-add-budget"
            onClick={(e) => {
              e.preventDefault();
              // const newBudgetId =
              //   e.target.parentNode.childNodes[0][
              //     e.target.parentNode.childNodes[0].selectedIndex
              //   ].id;
              // console.log(newBudgetId);
              dispatch({ type: ACTIONS.SUBMIT_CHANGE_BUDGET });
            }}
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
}
