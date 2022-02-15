import React from "react";
import { ACTIONS } from "../App";
export default function NewBudget({ data, dispatch }) {
  return (
    <div className="modal">
      <div className="new-budget">
        <div className="new-budget-header">
          <h1>New Budget</h1>
          <button
            className="close"
            onClick={() => dispatch({ type: ACTIONS.NEW_BUDGET })}
          >
            X
          </button>
        </div>
        <form className="new-budget-form">
          <p>Name</p>
          <input
            autoFocus
            type="text"
            name="budgetName"
            value={data.budgetName}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.CHANGE_BUDGET_NAME,
                payload: e.target.value,
              })
            }
          />
          <p>Maximum Spending</p>
          <input
            type="number"
            name="maxSpending"
            value={data.maxSpending}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.CHANGE_BUDGET_MAX_SPENDING,
                payload: e.target.value,
              })
            }
          />
          <button
            className="button-add-budget"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: ACTIONS.ADD_BUDGET });
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
