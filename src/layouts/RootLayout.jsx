import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setSearchTerm("");
    }
  }, [location.pathname]);
  return (
    <div className="bg-[#16181E] px-[5%] min-h-screen">
      <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} location={location}/>
      <Outlet context={{ searchTerm, onSearchChange: handleSearchChange }} />
    </div>
  );
}
