import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTransactionForm from "../../components/AddTransactionForm";
import TransactionsList from "../../components/TransactionsList";

test("add a new transaction to frontend", () => {
  // Mock function for postTransaction
  const mockPostTransaction = vi.fn();

  render(
    <>
      <AddTransactionForm postTransaction={mockPostTransaction} />
      <TransactionsList transactions={[]} />
    </>
  );

  // Grab inputs using labels
  const dateInput = screen.getByLabelText(/date/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const categoryInput = screen.getByLabelText(/category/i);
  const amountInput = screen.getByLabelText(/amount/i);

  const addBtn = screen.getByRole("button", { name: /add transaction/i });

  // Fill out the form
  fireEvent.change(dateInput, { target: { value: "2026-02-18" } });
  fireEvent.change(descriptionInput, { target: { value: "New Transaction" } });
  fireEvent.change(categoryInput, { target: { value: "Food" } });
  fireEvent.change(amountInput, { target: { value: "100" } });

  // Submit the form
  fireEvent.click(addBtn);

  // Check that the mock function was called with correct data
  expect(mockPostTransaction).toHaveBeenCalledWith({
    date: "2026-02-18",
    description: "New Transaction",
    category: "Food",
    amount: 100, // Make sure your form converts amount to number
  });

  // Optional: ensure it was called only once
  expect(mockPostTransaction).toHaveBeenCalledTimes(1);
});
