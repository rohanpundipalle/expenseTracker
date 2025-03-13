import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [action.payload, ...state];
    case "SET_EXPENSES":
      const invertedExpenses = action.payload.reverse();
      return invertedExpenses;
    case "DELETE_EXPENSE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE_EXPENSE":
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpense = state[expenseIndex];
      const updatedItem = { ...updatedExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
};

export const ExpensesContextProvider = (props) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpenseHandler = (expenseData) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseData,
    });
  };

  const setExpensesHandler = (expenses) => {
    dispatch({
      type: "SET_EXPENSES",
      payload: expenses,
    });
  };

  const deleteExpenseHandler = (expenseId) => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: expenseId,
    });
  };

  const updateExpenseHandler = (expenseId, expenseData) => {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: { id: expenseId, data: expenseData },
    });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense: addExpenseHandler,
        setExpenses: setExpensesHandler,
        deleteExpense: deleteExpenseHandler,
        updateExpense: updateExpenseHandler,
      }}
    >
      {props.children}
    </ExpensesContext.Provider>
  );
};
