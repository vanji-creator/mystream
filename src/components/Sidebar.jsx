import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faBolt, faVideo, faBroadcastTower,
  faMusic, faFutbol, faFilm, faPodcast, faClock, faList
} from "@fortawesome/free-solid-svg-icons";

const SidebarItem = ({ icon, label, to }) => (
  <li className="mb-2">
    <Link
      to={to || "/"}
      className="flex items-center p-3 rounded-xl text-stonks-text hover:bg-gradient-to-r hover:from-stonks-accent hover:to-stonks-purple hover:text-black transition-all duration-300 group"
    >
      <div className="w-8 flex justify-center">
        <FontAwesomeIcon icon={icon} className="text-lg group-hover:scale-110 transition-transform duration-300" />
      </div>
      <span className="ml-4 font-medium tracking-wide">{label}</span>
    </Link>
  </li>
);

const SidebarSection = ({ title, children }) => (
  <div className="mb-6">
    {title && <h1 className="px-3 mb-2 text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</h1>}
    <ul>{children}</ul>
  </div>
);

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="w-56 flex-shrink-0 h-[calc(100vh-5rem)] p-3 sticky top-20 overflow-y-auto glass border-r border-stonks-700 animate-slide-up scrollbar-hide">
      <SidebarSection>
        <SidebarItem icon={faHome} label="Home" to="/" />
        <SidebarItem icon={faBolt} label="Shorts" />
        <SidebarItem icon={faVideo} label="Videos" />
        <SidebarItem icon={faBroadcastTower} label="Live" />
      </SidebarSection>

      <div className="border-t border-stonks-700 my-4 opacity-50"></div>

      <SidebarSection title="Subscriptions">
        <SidebarItem icon={faMusic} label="Music" />
        <SidebarItem icon={faFutbol} label="Sports" />
        <SidebarItem icon={faFilm} label="Movies" />
        <SidebarItem icon={faPodcast} label="Podcasts" />
      </SidebarSection>

      <div className="border-t border-stonks-700 my-4 opacity-50"></div>

      <SidebarSection title="You">
        <SidebarItem icon={faClock} label="Watch Later" />
        <SidebarItem icon={faList} label="Playlist" />
      </SidebarSection>
    </div>
  );
};

export default Sidebar;
