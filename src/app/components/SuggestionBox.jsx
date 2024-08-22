"use client";
// SuggestionBox.js
import React from "react";

const SuggestionBox = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul
      className="absolute bg-white w-full mt-1 rounded-md shadow-lg z-60 text-black"
      style={{ maxHeight: "200px", overflowY: "auto" }} // Added max-height and scroll
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="cursor-pointer hover:bg-gray-200 p-2"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionBox;
