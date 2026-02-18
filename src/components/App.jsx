import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import Sort from "./Sort";
import Search from "./Search";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2026-02-18", description: "Groceries", category: "Food", amount: 50 },
    { id: 2, date: "2026-02-01", description: "Rent", category: "Housing", amount: 500 },
    { id: 3, date: "2026-02-17", description: "Coffee", category: "Beverage", amount: 5 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Filter and sort transactions
  let filtered = transactions.filter((t) =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "amount") {
    filtered.sort((a, b) => a.amount - b.amount);
  } else if (sortBy === "description") {
    filtered.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "category") {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Sort onSort={setSortBy} />
      <TransactionsList transactions={filtered} />
    </div>
  );
}

export default App;
