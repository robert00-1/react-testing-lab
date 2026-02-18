import React from "react";

function Sort({ onSort }) {
  return (
    <div>
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="description">Description</option>
        <option value="category">Category</option>
        <option value="amount">Amount</option>
      </select>
    </div>
  );
}

export default Sort;
