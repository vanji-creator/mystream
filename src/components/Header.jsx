import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { GOOGLE_API_KEY } from "../utils/constants";
import { addSearchResults } from "../utils/videoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser, faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionResult, setSuggestionResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestionResult(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  function fetchJsonp(url, params = {}, callbackName = "callback") {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const callback = `jsonpCallback_${Date.now()}`;
      params[callbackName] = callback;
      const queryParams = new URLSearchParams(params).toString();

      script.src = `${url}?${queryParams}`;

      window[callback] = (data) => {
        resolve(data);
        delete window[callback];
        document.body.removeChild(script);
      };

      script.onerror = () => {
        reject(new Error("JSONP request failed"));
        delete window[callback];
        document.body.removeChild(script);
      };

      document.body.appendChild(script);
    });
  }

  const GOOGLE_AC_URL = `https://clients1.google.com/complete/search`;

  function fetchAutocompleteSuggestions(searchQuery) {
    const params = {
      client: "youtube",
      hl: "en",
      ds: "yt",
      q: searchQuery,
    };

    return fetchJsonp(GOOGLE_AC_URL, params, "callback")
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching autocomplete suggestions:", error);
      });
  }

  const getSearchSuggestions = async () => {
    const result = await fetchAutocompleteSuggestions(searchQuery);
    if (result) {
      const suggestions = result[1].map((suggestion) => suggestion[0]);
      setSuggestionResult(suggestions);
      dispatch(cacheResults({ [searchQuery]: suggestions }));
    }
  };

  const getSearchVideos = async (suggestion) => {
    setSearchQuery(suggestion);
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" +
      suggestion +
      "&key=" +
      GOOGLE_API_KEY
    );
    const json = await data.json();
    dispatch(addSearchResults(json.items));
  };

  const handleSuggestionClick = (suggestion) => {
    getSearchVideos(suggestion);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="sticky top-0 z-50 grid grid-flow-col p-4 items-center glass shadow-2xl animate-fade-in">
      <div className="flex items-center col-span-2 space-x-4">
        <button
          onClick={toggleMenuHandler}
          className="text-stonks-text hover:text-stonks-accent transition-colors duration-300 p-2 rounded-full hover:bg-stonks-800"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <a href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-stonks-accent to-stonks-purple rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-stonks-accent/50 transition-all duration-300">
            <span className="text-black font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight hidden md:block">
            Stonks<span className="text-stonks-accent">Stream</span>
          </span>
        </a>
      </div>

      <div className="col-span-8 flex justify-center relative">
        <div className="w-full max-w-2xl relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-stonks-accent to-stonks-purple rounded-full opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full bg-stonks-800 text-stonks-text px-6 py-3 rounded-l-full border border-stonks-700 focus:outline-none focus:border-stonks-accent placeholder-gray-500 transition-all duration-300"
              placeholder="Search for greatness..."
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-6 py-3 bg-stonks-700 text-stonks-text rounded-r-full hover:bg-stonks-600 border-l border-stonks-800 transition-colors duration-300"
              onMouseDown={() => handleSuggestionClick(searchQuery)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {showSuggestions && suggestionResult.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-stonks-800 rounded-xl shadow-2xl border border-stonks-700 overflow-hidden z-50 animate-slide-up">
              <ul className="py-2">
                {suggestionResult.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-4 py-2 hover:bg-stonks-700 cursor-pointer flex items-center space-x-3 text-stonks-text transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-sm" />
                    <button
                      className="w-full text-left"
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-2 flex justify-end items-center space-x-6 pr-4">
        <button className="text-stonks-text hover:text-stonks-accent transition-colors duration-300 relative">
          <FontAwesomeIcon icon={faBell} size="lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-stonks-purple rounded-full animate-pulse"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-stonks-purple to-blue-500 p-0.5 cursor-pointer hover:scale-110 transition-transform duration-300">
          <div className="w-full h-full rounded-full bg-stonks-900 flex items-center justify-center overflow-hidden">
            <FontAwesomeIcon icon={faUser} className="text-stonks-text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
