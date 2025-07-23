// components/Sidebar.jsx
import { FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from "react-router";
import { AuthContext } from "../utils/AuthContext";

const Sidebar = ({ open, onClose }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleLogout = async (req, res) => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleHistory = () => {
    navigate("/history");
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full w-48 bg-neutral-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
        <h2 className="text-base font-medium tracking-wide">Menu</h2>
        <button onClick={onClose} aria-label="Close Sidebar">
          <FaTimes className="text-lg hover:text-red-400 transition-colors duration-200" />
        </button>
      </div>

      <ul className="px-4 py-4 space-y-3 text-sm">
        {user ? (
          <>
            <li>
              <button
                onClick={handleHistory}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                History
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogin}
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
