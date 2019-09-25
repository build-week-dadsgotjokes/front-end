import React from "react";

const SearchBar = ({ onChange, value }) => {
  return (
    <div className="search-bar">
      <input
        onChange={e => {
          onChange(e.target.value);
        }}
        placeholder="Jokes"
        value={value}
        type="text"
      />
      <button type="submit">Search</button>
    </div>
  );
};

export default SearchBar;
