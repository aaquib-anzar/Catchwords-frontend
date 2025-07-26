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
      onClose(); // ✅ close sidebar after login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
      onClose(); // ✅ close sidebar after logout
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleHistory = () => {
    navigate("/history");
    onClose(); // ✅ close sidebar after navigating
  };

  return (
    <div
      className={`fixed top-20 right-0 w-36 bg-neutral-900 text-white rounded-xl shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-700">
        <h2 className="text-sm font-medium tracking-wide">Menu</h2>
        <button onClick={onClose}  aria-label="Close Sidebar">
          <FaTimes className="text-base hover:text-red-400 transition-colors duration-200" />
        </button>
      </div>


      <ul className="px-3 py-3 space-y-2 text-sm">
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
