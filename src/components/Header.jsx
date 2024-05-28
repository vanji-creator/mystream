import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Header = () => {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="ml-2 grid grid-flow-col p-2 shadow-lg">
      <div className="flex col-span-2">
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
        <input
          type="text"
          className="px-2 h-8 w-3/5 border border-slate-700 rounded-full"
        />
        <button className="ml-2 hover:text-slate-600">Search</button>
      </div>
      <div className="col-span-2">
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
