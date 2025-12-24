import React, { useState } from "react";
import API from "../services/api";
import "./SearchForm.css";

const SearchForm = ({ setBuses }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!source || !destination) {
      alert("Please fill both fields");
      return;
    }

    try {
      const res = await API.get(
        `/buses/search?source=${source}&destination=${destination}`
      );
      setBuses(res.data.data);
    } catch (error) {
      console.log("Error searching buses", error);
    }
  };

  return (
    <div className="search-box">
      <h2 className="search-title">🔎 Search Buses</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter Source City"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Destination City"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button type="submit">Search Bus</button>
      </form>
    </div>
  );
};

export default SearchForm;
