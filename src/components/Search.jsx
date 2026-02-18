import React from "react";

function Search({ searchTerm, setSearchTerm, setSearch }) {
  // Handle both prop names for backward compatibility
  const handleChange = (e) => {
    if (setSearchTerm) setSearchTerm(e.target.value);
    else if (setSearch) setSearch(e.target.value);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm || ""}
        onChange={handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
