import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ searchTerm, onSearchChange, location }) {
  // Determine if the search input should be hidden
  const shouldHideSearchInput = location.pathname.startsWith("/movie/");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    onSearchChange(value);
  };

  return (
    <header className="flex justify-between items-center text-white h-20">
      <nav className="flex gap-6 font-semibold">
        <NavLink to="/">
          <img src="/logo.png" className="w-10" alt="Movie Diary" />
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `border-b-2 py-2 ${
              isActive
                ? "text-primary border-primary"
                : "border-transparent hover:text-primary hover:border-primary"
            }`
          }
        >
          Popular
        </NavLink>
        <NavLink
          to="/favorities"
          className={({ isActive }) =>
            `border-b-2 py-2 ${
              isActive
                ? "text-primary border-primary"
                : "border-transparent hover:text-primary hover:border-primary"
            }`
          }
        >
          My Favorities
        </NavLink>
      </nav>
      {!shouldHideSearchInput && (
        <div className="relative">
          <input
            id="search"
            type="text"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full ps-5 pe-10 py-2.5 rounded-lg bg-[#21242d] outline-none"
          />
          <i className="fa-solid fa-filter text-gray-400 absolute top-4 right-3"></i>
        </div>
      )}
    </header>
  );
}
