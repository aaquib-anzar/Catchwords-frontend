// components/Sidebar.jsx
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

const Sidebar = ({ open, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose}>
          <FaTimes className="text-xl" />
        </button>
      </div>

      <ul className="px-4 py-4 space-y-4">
        {isAuthenticated ? (
          <>
            <li>
              <a href="#" className="hover:text-blue-400">
                History
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="hover:text-blue-400">
                Logout
              </a>
            </li>
          </>
        ) : (
          <li>
            <a onClick={handleLogin}
              className="hover:text-blue-400"
            >
              Login
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
