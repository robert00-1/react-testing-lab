import { render, screen, fireEvent } from "@testing-library/react";
import React, { useState } from "react";
import TransactionsList from "../../components/TransactionsList";
import Search from "../../components/Search";
import Sort from "../../components/Sort";

// Wrapper simulating your container
function TestSearchSort() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Groceries", category: "Food", amount: 50, date: "2026-02-18" },
    { id: 2, description: "Rent", category: "Housing", amount: 500, date: "2026-02-01" },
    { id: 3, description: "Coffee", category: "Beverage", amount: 5, date: "2026-02-17" },
  ]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "amount") return a.amount - b.amount;
    if (sortBy === "description") return a.description.localeCompare(b.description);
    return 0;
  });

  return (
    <>
      <Search setSearch={setSearch} placeholder="Search your Recent Transactions" />
      <Sort onSort={setSortBy} />
      <TransactionsList transactions={sortedTransactions} />
    </>
  );
}

test("filters transactions with search input", () => {
  render(<TestSearchSort />);

  // updated placeholder text to match Search.jsx
  const searchInput = screen.getByPlaceholderText("Search your Recent Transactions");
  fireEvent.change(searchInput, { target: { value: "Groceries" } });

  expect(screen.getByText("Groceries")).toBeInTheDocument();
  expect(screen.queryByText("Rent")).not.toBeInTheDocument();
});

test("sorts transactions by amount", () => {
  render(<TestSearchSort />);

  // select the first <select> element directly
  const sortSelect = screen.getByRole("combobox");
  fireEvent.change(sortSelect, { target: { value: "amount" } });

  const rows = screen.getAllByTestId("transaction-item");
  const amounts = rows.map(row => Number(row.cells[3].textContent));
  expect(amounts).toEqual(amounts.slice().sort((a, b) => a - b));
});

test("sorts transactions by description", () => {
  render(<TestSearchSort />);

  const sortSelect = screen.getByRole("combobox");
  fireEvent.change(sortSelect, { target: { value: "description" } });

  const rows = screen.getAllByTestId("transaction-item");
  const descriptions = rows.map(row => row.cells[1].textContent);
  expect(descriptions).toEqual(descriptions.slice().sort());
});

