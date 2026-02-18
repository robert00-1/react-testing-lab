import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions = [], sortBy = "description" }) {
  // Make a sorted copy of transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortBy === "amount") return a.amount - b.amount;
    if (sortBy === "description") return a.description.localeCompare(b.description);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">DELETE</h3>
          </th>
        </tr>
        {sortedTransactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
