import React from "react";
import { ACTIONS } from "../App";

export default function AddExpenseModal({ data, budgets, dispatch }) {
  return (
    <div className="modal">
      <div className="new-expense">
        <div className="new-budget-header">
          <h1>New Expense</h1>
          <button
            className="close"
            onClick={() => dispatch({ type: ACTIONS.NEW_EXPENSE })}
          ></button>
        </div>
        <form className="new-budget-form">
          <p>Description</p>
          <input
            autoFocus
            type="text"
            name="expenseDescription"
            value={data.expenseDescription}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.CHANGE_EXPENSE_DESCRIPTION,
                payload: e.target.value,
              })
            }
          />
          <p>Amount</p>
          <input
            type="number"
            name="expenseAmount"
            value={data.expenseAmount}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.CHANGE_EXPENSE_AMOUNT,
                payload: e.target.value,
              })
            }
          />
          <p>Budget</p>
          <select
            className="new-expense-select"
            name="expenseBudget"
            value={data.expenseBudget}
            onChange={(e) => {
              dispatch({
                type: ACTIONS.CHANGE_EXPENSE_BUDGET,
                payload: e.target[e.target.selectedIndex].id,
              });
            }}
          >
            <option>Uncategorized</option>
            {budgets.map((budget) => {
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
              const selectedOption =
                e.target.parentNode.childNodes[5].options[
                  e.target.parentNode.childNodes[5].selectedIndex
                ].id;
              // console.log(!selectedOption === false);
              dispatch({
                type: ACTIONS.ADD_EXPENSE,
                payload: selectedOption,
              });
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
