import React, { useState } from "react";

const SearchBar = ({ query, onSearch }) => {
    const [inputValue, setInputValue] = useState(query);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
            <input
                type="text"
                placeholder="Search for books..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ padding: "10px", width: "300px", borderRadius: "5px" }}
            />
            <button
                type="submit"
                style={{ padding: "10px 15px", marginLeft: "10px", borderRadius: "5px" }}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
