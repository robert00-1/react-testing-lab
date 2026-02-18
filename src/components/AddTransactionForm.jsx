import React, { useState } from "react";

function AddTransactionForm({ postTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function submitForm(e) {
    e.preventDefault();
    postTransaction({
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount)
    });
    setFormData({ date: "", description: "", category: "", amount: "" });
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={submitForm}>
        <div className="inline fields">
          <label>
            Date
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <label>
            Description
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Category
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
          </label>
          <label>
            Amount
            <input type="number" name="amount" step="0.01" value={formData.amount} onChange={handleChange} />
          </label>
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
