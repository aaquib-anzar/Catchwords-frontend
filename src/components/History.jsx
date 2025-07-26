import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../utils/AuthContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function History() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const response = await axios.get(`${baseURL}/getcaption`, {
          params: { email: user?.email },
          withCredentials: true,
        });

        if (response.data.captions) {
          setHistory(response.data.captions);
        } else if (response.data.message) {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchCaptions();
    }
  }, [user]);

  const handleDelete = async (caption) => {
    try {
      await axios.post(
        `${baseURL}/deletecaption`,
        { email: user?.email, caption },
        { withCredentials: true }
      );
      setHistory((prev) => prev.filter((item) => item !== caption));
      toast.success("Caption deleted.");
    } catch (error) {
      console.error("Failed to delete the caption", error);
      toast.error("Failed to delete.");
    }
  };

  return (
    <div className="pt-24 p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Caption History</h1>

      {user ? (
        <>
          {loading && <p>Loading...</p>}
          {!loading && message && <p>{message}</p>}
          {!loading && history.length > 0 && (
            <ul className="space-y-2">
              {history.map((caption, index) => (
                <li
                  key={index}
                  data-testid="caption-item"
                  className="flex items-center justify-between gap-2 bg-neutral-800 px-4 py-2 rounded-md relative z-10"
                >
                  <span className="flex-1 break-words">{caption}</span>
                  <MdDelete
                    className="cursor-pointer text-red-400 hover:text-red-300 transition"
                    onClick={() => handleDelete(caption)}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="relative z-10">
          No Interactions Yet{" "}
          <NavLink
            data-testid="go-back-link"
            className="underline text-blue-400"
            to="/"
          >
            Go Back
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default History;
