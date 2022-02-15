import React from "react";
import "./index.css";
import { nanoid } from "nanoid";
import Header from "./Components/Header";
import Budget from "./Components/Budget";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import ViewExpensesModal from "./Components/ViewExpensesModal";
import UncategorizedExpenses from "./Components/UncategorizedExpenses";
import ChangeBudgetModal from "./Components/ChangeBudgetModal";

export const ACTIONS = {
  NEW_BUDGET: "new-budget",
  ADD_BUDGET: "add-budget",
  CHANGE_BUDGET_NAME: "change-budget-name",
  CHANGE_BUDGET_MAX_SPENDING: "change-budget-max-spending",
  NEW_EXPENSE: "new-expense",
  ADD_EXPENSE: "add-expense",
  CHANGE_EXPENSE_DESCRIPTION: "change-expense-description",
  CHANGE_EXPENSE_AMOUNT: "change-expense-amount",
  CHANGE_EXPENSE_BUDGET: "change-expense-budget",
  SHOW_EXPENSES: "show-expenses",
  DELETE_BUDGET: "delete-budget",
  DELETE_EXPENSE: "delete-expense",
  //////////////////////////////////////////////////////////
  CHANGE_BUDGET: "change-budget",
  CHANGE_CURRENT_EXPENSE_BUDGET: "change-current-expense-budget",
  SUBMIT_CHANGE_BUDGET: "submit-change-budget",
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEW_BUDGET:
      return {
        ...state,
        addNewBudgetIsShown: !state.addNewBudgetIsShown,
      };
    case ACTIONS.CHANGE_BUDGET_NAME:
      return {
        ...state,
        newBudget: {
          ...state.newBudget,
          budgetName: action.payload,
        },
      };
    case ACTIONS.CHANGE_BUDGET_MAX_SPENDING:
      return {
        ...state,
        newBudget: {
          ...state.newBudget,
          maxSpending: action.payload,
        },
      };
    case ACTIONS.ADD_BUDGET:
      return {
        ...state,
        addNewBudgetIsShown: false,
        budgetsList: [...state.budgetsList, state.newBudget],
        newBudget: {
          budgetName: "",
          maxSpending: "",
          expenses: [],
          id: nanoid(),
        },
      };
    case ACTIONS.NEW_EXPENSE:
      if (action.payload) {
        if (action.payload.id) {
          return {
            ...state,
            addNewExpenseIsShown: !state.addNewExpenseIsShown,
            newExpense: {
              ...state.newExpense,
              expenseBudget: state.budgetsList.find(
                (budget) => budget.id === action.payload.id
              ).id,
            },
          };
        } else if (action.payload.uncategorizedExpensesId) {
          return {
            ...state,
            addNewExpenseIsShown: !state.addNewExpenseIsShown,
            newExpense: {
              ...state.newExpense,
              expenseBudget: state.uncategorizedExpenses.id,
            },
          };
        } else {
          return {
            ...state,
            addNewExpenseIsShown: !state.addNewExpenseIsShown,
          };
        }
      } else {
        return {
          ...state,
          addNewExpenseIsShown: !state.addNewExpenseIsShown,
          newExpense: {
            ...state.newExpense,
            expenseBudget: state.uncategorizedExpenses.id,
          },
        };
      }
    case ACTIONS.CHANGE_EXPENSE_DESCRIPTION:
      return {
        ...state,
        newExpense: {
          ...state.newExpense,
          expenseDescription: action.payload,
        },
      };
    case ACTIONS.CHANGE_EXPENSE_AMOUNT:
      return {
        ...state,
        newExpense: {
          ...state.newExpense,
          expenseAmount: action.payload,
        },
      };
    case ACTIONS.CHANGE_EXPENSE_BUDGET:
      return {
        ...state,
        newExpense: {
          ...state.newExpense,
          expenseBudget: action.payload,
        },
      };
    case ACTIONS.ADD_EXPENSE:
      ////////////////////////
      if (!action.payload)
        return {
          ...state,
          addNewExpenseIsShown: false,
          uncategorizedExpenses: {
            ...state.uncategorizedExpenses,
            expenses: [
              ...state.uncategorizedExpenses.expenses,
              state.newExpense,
            ],
          },
          newExpense: {
            expenseAmount: "",
            expenseDescription: "",
            expenseBudget: "",
            id: nanoid(),
          },
        };
      return {
        ...state,
        addNewExpenseIsShown: false,
        budgetsList: state.budgetsList.map((budget) => {
          return action.payload === budget.id
            ? { ...budget, expenses: [...budget.expenses, state.newExpense] }
            : budget;
        }),
        newExpense: {
          expenseAmount: "",
          expenseDescription: "",
          expenseBudget: "",
          id: nanoid(),
        },
      };
    case ACTIONS.SHOW_EXPENSES:
      if (action.payload) {
        if (action.payload.id) {
          return {
            ...state,
            expensesIsShown: !state.expensesIsShown,
            currentBudget: state.budgetsList.find(
              (budget) => budget.id === action.payload.id
            ),
          };
        } else if (action.payload.uncategorizedExpensesId) {
          return {
            ...state,
            expensesIsShown: !state.expensesIsShown,
            currentBudget: state.uncategorizedExpenses,
          };
        } else {
          return {
            ...state,
            expensesIsShown: !state.expensesIsShown,
            currentBudget: [],
          };
        }
      } else {
        return {
          ...state,
          expensesIsShown: !state.expensesIsShown,
          currentBudget: [],
        };
      }
    case ACTIONS.DELETE_BUDGET:
      return {
        ...state,
        budgetsList: state.budgetsList.filter(
          (budget) => budget.id !== action.payload
        ),
        expensesIsShown: false,
      };
    case ACTIONS.DELETE_EXPENSE:
      let newBudget;
      let expensesStatus;
      if (action.payload) {
        if (action.payload.uncategorized) {
          newBudget = {
            ...state.uncategorizedExpenses,
            expenses: state.uncategorizedExpenses.expenses.filter((exp) => {
              return exp.id !== action.payload.expenseId;
            }),
          };
          expensesStatus = newBudget.expenses.length === 0 ? false : true;
          return {
            ...state,
            uncategorizedExpenses: newBudget,
            currentBudget: newBudget,
            expensesIsShown: expensesStatus,
          };
        } else {
          return {
            ...state,
            budgetsList: state.budgetsList.map((budget) => {
              if (budget.id === action.payload.budgetId) {
                newBudget = {
                  ...budget,
                  expenses: budget.expenses.filter(
                    (expense) => expense.id !== action.payload.expenseId
                  ),
                };
                expensesStatus = newBudget.expenses.length === 0 ? false : true;
                return newBudget;
              } else {
                return budget;
              }
            }),
            currentBudget: newBudget,
            expensesIsShown: expensesStatus,
          };
        }
      }
    ///////////////////
    case ACTIONS.CHANGE_BUDGET:
      // console.log(action.payload);
      if (action.payload) {
        return {
          ...state,
          changeBudgetIsShown: !state.changeBudgetIsShown,
          currentExpense: {
            ...action.payload,
            prevExpenseBudget: action.payload.expenseBudget,
          },
        };
      } else {
        return {
          ...state,
          changeBudgetIsShown: !state.changeBudgetIsShown,
        };
      }

    case ACTIONS.CHANGE_CURRENT_EXPENSE_BUDGET:
      return {
        ...state,
        currentExpense: {
          ...state.currentExpense,
          expenseBudget: action.payload,
        },
      };
    case ACTIONS.SUBMIT_CHANGE_BUDGET:
      // trouble with  moving to UNCATEGORIZED (uncategorized obj is displayed)
      let newObj;
      let expenseStatus;
      let newCurrentBudget;
      // console.log(expensesStatus);
      if (
        state.currentExpense.expenseBudget === state.uncategorizedExpenses.id
      ) {
        newObj = {
          ...state.uncategorizedExpenses,
          expenses: [
            ...state.uncategorizedExpenses.expenses,
            {
              ...state.currentExpense,
            },
          ],
        };
        const newBudgetList = state.budgetsList.map((budget) => {
          if (budget.id === state.currentExpense.prevExpenseBudget) {
            return {
              ...budget,
              expenses: budget.expenses.filter(
                (expense) => expense.id !== state.currentExpense.id
              ),
            };
          } else {
            return budget;
          }
        });
        newCurrentBudget = newBudgetList.find(
          (budget) => budget.id === state.currentExpense.prevExpenseBudget
        );
        expenseStatus = newCurrentBudget.expenses.length === 0 ? false : true;
        return {
          ...state,
          uncategorizedExpenses: newObj,
          budgetsList: state.budgetsList.map((budget) => {
            if (budget.id === state.currentExpense.prevExpenseBudget) {
              return {
                ...budget,
                expenses: budget.expenses.filter(
                  (expense) => expense.id !== state.currentExpense.id
                ),
              };
            } else {
              return budget;
            }
          }),
          currentExpense: {},
          currentBudget: newCurrentBudget,
          changeBudgetIsShown: !state.changeBudgetIsShown,
          expensesIsShown: expenseStatus,
        };
      } else if (
        state.currentExpense.prevExpenseBudget ===
          state.uncategorizedExpenses.id &&
        state.currentExpense.expenseBudget !== state.uncategorizedExpenses.id
      ) {
        // from uncategorized to another budget
        newObj = {
          ...state.uncategorizedExpenses,
          expenses: state.uncategorizedExpenses.expenses.filter(
            (expense) => expense.id !== state.currentExpense.id
          ),
        };
        expenseStatus = newObj.expenses.length === 0 ? false : true;
        return {
          ...state,
          budgetsList: state.budgetsList.map((budget) => {
            if (budget.id === state.currentExpense.expenseBudget) {
              return {
                ...budget,
                expenses: [...budget.expenses, state.currentExpense],
              };
            } else {
              return budget;
            }
          }),
          currentBudget: newObj,
          uncategorizedExpenses: newObj,
          currentExpense: {},
          changeBudgetIsShown: !state.changeBudgetIsShown,
          expensesIsShown: expenseStatus,
        };
      } else {
        newObj = state.budgetsList.map((budget) => {
          if (budget.id === state.currentExpense.expenseBudget) {
            // delete state.currentExpense.prevExpenseBudget;
            return {
              ...budget,
              expenses: [...budget.expenses, state.currentExpense],
            };
          } else if (budget.id === state.currentExpense.prevExpenseBudget) {
            return {
              ...budget,
              expenses: budget.expenses.filter(
                (expense) => expense.id !== state.currentExpense.id
              ),
            };
          } else {
            return budget;
          }
        });
        newCurrentBudget = newObj.find(
          (budget) => budget.id === state.currentExpense.prevExpenseBudget
        );
        expenseStatus = newCurrentBudget.expenses.length === 0 ? false : true;
        return {
          ...state,
          budgetsList: newObj,
          currentExpense: {},
          currentBudget: newCurrentBudget,
          changeBudgetIsShown: !state.changeBudgetIsShown,
          expensesIsShown: expenseStatus,
        };
      }

    default:
      return state;
  }
}
export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    uncategorizedExpenses: JSON.parse(
      localStorage.getItem("uncategorizedExpenses")
    ) || {
      budgetName: "Uncategorized",
      expenses: [],
      id: nanoid(),
      uncategorized: true,
    },
    budgetsList: JSON.parse(localStorage.getItem("budgetsList")) || [],
    addNewBudgetIsShown: false,
    addNewExpenseIsShown: false,
    expensesIsShown: false,
    changeBudgetIsShown: false,
    currentBudget: [],
    currentExpense: {},
    newBudget: {
      budgetName: "",
      maxSpending: "",
      expenses: [],
      id: nanoid(),
    },
    newExpense: {
      expenseAmount: "",
      expenseDescription: "",
      expenseBudget: "",
      id: nanoid(),
    },
  });
  console.log(state.currentExpense);
  console.log(state);
  // console.log("state.uncategorizedExpenses", state.uncategorizedExpenses);
  // console.log("state.currentBudget", state.currentBudget);
  React.useEffect(() => {
    localStorage.setItem("budgetsList", JSON.stringify(state.budgetsList));
    localStorage.setItem(
      "uncategorizedExpenses",
      JSON.stringify(state.uncategorizedExpenses)
    );
  }, [state.budgetsList, state.uncategorizedExpenses]);
  //
  const budgetElements = state.budgetsList.map((budget) => (
    <Budget key={budget.id} data={budget} dispatch={dispatch} />
  ));
  //
  return (
    <div className="main">
      <Header dispatch={dispatch} />
      {state.addNewBudgetIsShown && (
        <AddBudgetModal data={state.newBudget} dispatch={dispatch} />
      )}
      {state.addNewExpenseIsShown && (
        <AddExpenseModal
          data={state.newExpense}
          budgets={state.budgetsList}
          dispatch={dispatch}
        />
      )}
      {state.expensesIsShown && (
        <ViewExpensesModal data={state.currentBudget} dispatch={dispatch} />
      )}
      {state.changeBudgetIsShown && (
        <ChangeBudgetModal data={state} dispatch={dispatch} />
      )}
      <div className="budets-list-block">
        {state.budgetsList.length !== 0 && budgetElements}
        {state.uncategorizedExpenses.expenses.length !== 0 && (
          <UncategorizedExpenses
            dispatch={dispatch}
            data={state.uncategorizedExpenses}
          />
        )}
      </div>
    </div>
  );
}
