"use client";
import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image"; // Import Image from next/image
import { useRouter } from "next/navigation";

const TutorialSearch = ({ suggestions }) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const router = useRouter(); // Use router for navigation
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    console.log("Filtered Suggestions: ", filtered); // Debugging line
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  const handleBlur = () => {
    setTimeout(() => setFilteredSuggestions([]), 100);
  };

  const handleFocus = () => {
    if (query) {
      setFilteredSuggestions(
        suggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/store?query=${encodeURIComponent(query)}`);
  };

  return (
    <main className="flex flex-col lg:flex-row gap-2 sm:gap-4">
      <div style={{ width: "100%", maxWidth: "350px", margin: "0 auto" }}>
        <div ref={inputRef}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              placeholder="Search..."
              value={query}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              InputProps={{
                startAdornment: (
                  <Image
                    src={"/img/blackSearch.png"}
                    height={20}
                    width={20}
                    style={{ marginLeft: "8px" }}
                    className="lg:block hidden"
                    alt="Search Icon"
                  />
                ),
                className:
                  "text-[#A3A3A3] bg-[#FAFAFA] p-[0.3vw] focus:outline-none rounded-lg border-[1px] border-[#FAFAFA] w-[20vw]",
                style: { padding: "0.3vw" },
              }}
              sx={{
                "& input": {
                  padding: "0.3vw",
                  paddingLeft: 1,
                  "&::placeholder": {
                    color: "#000",
                    fontWeight: 500,
                  },
                },
              }}
            />
          </form>
          {filteredSuggestions.length > 0 && (
            <List className="z-[999] shadow-sm">
              {filteredSuggestions.map((suggestion, index) => (
                <ListItem
                  button
                  key={index}
                  className="text-gray-700 bg-white hover:text-black hover:bg-gray-200"
                  style={{ padding: "0.5vw" }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </div>
    </main>
  );
};

export default TutorialSearch;
