// components/Header.jsx
import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa"; // hamburger icon
import Sidebar from "./Sidebar";
import { ColourfulText } from "./ui/colourful-text";
import { NavLink, useNavigate } from "react-router";


const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-md text-white flex items-center justify-between shadow-md">
        <NavLink to = "/"className="text-2xl font-bold tracking-wide"><ColourfulText text="Catchword.ai" /></NavLink>
        <button onClick={() => setSidebarOpen(true)} >
          <FaBars className="text-2xl" />
        </button>
      </header>

      <Sidebar  open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
