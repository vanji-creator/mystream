import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { GOOGLE_API_KEY } from "../utils/constants";
import { addSearchResults } from "../utils/videoSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionResult, setSuggestionResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  // const suggestionsRef = useRef(null);

  useEffect(() => {
    //API call
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

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       suggestionsRef.current &&
  //       !suggestionsRef.current.contains(event.target) &&
  //       event.target.tagName !== "INPUT"
  //     ) {
  //       setShowSuggestions(false);
  //     }
  //   }

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

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
        // console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching autocomplete suggestions:", error);
      });
  }

  const getSearchSuggestions = async () => {
    // console.log(searchQuery);
    const result = await fetchAutocompleteSuggestions(searchQuery);
    if (result) {
      const suggestions = result[1].map((suggestion) => suggestion[0]);
      // console.log(suggestions);
      setSuggestionResult(suggestions);

      //update cache
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
    setShowSuggestions(false); // Optionally hide suggestions after selection
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // 200ms delay
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="ml-2 grid grid-flow-col p-2 shadow-lg  ">
      <div className="flex col-span-2 ">
        <img
          className="h-5 mt-2 ml-2 cursor-pointer"
          alt="hamburger-icon"
          src="https://img1.pnghut.com/t/12/0/19/SUYFW31q52/hamburger-button-menu-bar-computer-font-black-and-white.jpg"
          onClick={toggleMenuHandler}
        />
        <a href="/">
          <img
            className="h-8 ml-4 p-1"
            alt="youtube"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TdQa9xvFpj9ZPBKS2HlJauJZyVzqOuUI8ROCBMAX&s"
          />
        </a>
      </div>
      <div className="col-span-8">
        <div>
          <input
            type="text"
            className="px-4 h-8 w-3/5 border border-slate-700 rounded-full"
            placeholder="The best youtube clone"
            value={searchQuery}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="ml-2 hover:text-slate-600"
            onMouseDown={() => handleSuggestionClick(searchQuery)}
          >
            Search
          </button>
        </div>
        {showSuggestions && suggestionResult.length > 1 && (
          <div
            // ref={suggestionsRef}
            className={`fixed bg-white py-6 px-4 w-[31rem] rounded-lg text-slate-700 shadow-lg ${showSuggestions ? "block" : "hidden"}`}
          >
            <ul className="">
              {suggestionResult.map((suggestion) => (
                <li
                  className="hover:text-black hover:font-semibold m-1 hover:bg-gray-300"
                  key={suggestion}
                >
                  <button onMouseDown={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-2 flex ">
        <p className="mt-1 mx-2 text-slate-500">App Under Development</p>
        <img
          className="h-8"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Header;
