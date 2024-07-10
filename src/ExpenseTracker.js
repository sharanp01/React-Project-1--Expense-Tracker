import React, { useState } from "react";
import "./ExpenseTracker.css";
const ExpenseTracker = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const addExpense = () => {
    if (!input || !amount || !date) return;
    const newExpense = {
      id: expenses.length + 1,
      title: input,
      date: date,
      amount: parseFloat(amount),
    };
    setExpenses([...expenses, newExpense]);
    setInput("");
    setAmount("");
    setDate("");
  };
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expenses) => expenses.id !== id));
  };
  const getCurrentMonthExpenses = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  };

  const getTotalMonthExpenses = () => {
    const currentMonthExpenses = getCurrentMonthExpenses();
    let total = 0;
    for (const expense of currentMonthExpenses) {
      total += expense.amount;
    }
    return total;
  };

  return (
    <div className="container">
      <div className="heading">
        <h2>Expense Tracker</h2>
      </div>
      <div className="formControl">
        <input
          type="text"
          placeholder="Expense"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <div className="btndiv">
          <button onClick={addExpense}>Add Expense</button>
          <button
            onClick={() =>
              alert(`Total Monthly Expense: ${getTotalMonthExpenses()}`)
            }
          >
            {" "}
            Monthly Expense
          </button>
        </div>
      </div>
      {expenses.length > 0 && (
        <table className="expenseTable">
          <thead>
            <tr>
              <th>Srno</th>
              <th>Expense</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>
                  <span>{expense.id}</span>
                </td>
                <td>
                  <span>{expense.title}</span>
                </td>
                <td>
                  <span>{expense.date}</span>
                </td>
                <td>
                  <span>{expense.amount}</span>
                </td>
                <td>
                  <button onClick={() => deleteExpense(expense.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseTracker;
