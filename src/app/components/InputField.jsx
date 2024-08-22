"use client";
import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "@/context/globalState";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";

const suggestions = ["Bundle", "Single Pack", "Premiere Pro", "After Effects"];

const InputField = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useRouter();
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setFilteredSuggestions(
      suggestions.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  const handleSearch = () => {
    navigate.push(`/store?query=${encodeURIComponent(query)}`);
  };

  const handleBlur = () => {
    // Hide suggestions after a short delay to allow suggestion click
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

  return (
    <main className="flex flex-col lg:flex-row gap-2 sm:gap-4">
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <div ref={inputRef}>
          <TextField
            id="outlined-basic"
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon className="text-[#FF387A] ml-2" />,
              className:
                "text-gray-800 bg-[#F6F6F6] text-[4vw] sm:text-[2vw] lg:text-[1vw] focus:outline-none focus:shadow-md p-[0.3vw] rounded-md",
              style: { padding: "0.3vw" },
            }}
            sx={{
              "& input": {
                padding: "0.4vw",
                width: "21vw",
                fontSize: "1vw",
                border: "none",
                "@media (max-width: 1020px)": {
                  padding: "0.8vw",
                  width: "77vw",
                  fontSize: "2vw",
                },
                "@media (max-width: 768px)": {
                  padding: "1.2vw",
                  width: "77vw",
                  fontSize: "3vw",
                },
                "@media (max-width: 630px)": {
                  padding: "2vw",
                  width: "77vw",
                  fontSize: "4vw",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            }}
            value={query}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
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
      <button
        onClick={handleSearch}
        className="relative group bg-[#FF387A] text-[4vw] mt-[3vw] sm:mt-0 sm:text-[2vw] lg:text-[1vw] text-[#fff] py-[10px] pl-6 pr-8 sm:pl-8 sm:pr-10 rounded-md w-full sm:max-w-fit text-center transition-all duration-300 hover:shadow-md hover:bg-[#ff387af1] h-fit"
      >
        Search
        <span className="absolute top-[18%] right-2 w-[30px] h-[25px] overflow-hidden">
          <IoIosArrowRoundForward
            className="transform translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
            size={30}
          />
        </span>
      </button>
    </main>
  );
};

export default InputField;
