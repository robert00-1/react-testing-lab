import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionsList from "../../components/TransactionsList";

test("display transactions on startup", () => {
  const mockTransactions = [
    {
      id: 1,
      date: "2026-02-17",
      description: "Groceries",
      category: "Food",
      amount: 50,
    },
  ];

  render(<TransactionsList transactions={mockTransactions} />);

  const items = screen.getAllByTestId("transaction-item");
  expect(items.length).toBeGreaterThan(0);
});
