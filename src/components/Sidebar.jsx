import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return;
  return (
    <div className="w-56 border border-slate-500 h-screen p-6">
      <ul className="text-lg">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>Shorts</li>
        <li>Videos</li>
        <li>Live</li>
      </ul>
      <h1 className="pt-3 text-lg font-bold">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Movies</li>
        <li>Podcasts</li>
      </ul>
      <h1 className="pt-3 text-lg font-bold">Watch Later</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Movies</li>
        <li>Podcasts</li>
      </ul>
    </div>
  );
};

export default Sidebar;
