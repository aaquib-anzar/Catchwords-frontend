import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { AuthContext } from "../utils/AuthContext";
import { NavLink } from "react-router-dom";

function History() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL
  //const navigate = useNavigate()
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
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchCaptions();
    }
  }, [user]);

  return (
    <div className="pt-24 p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Caption History</h1>

      {user ? (
        <>
          {loading && <p>Loading...</p>}
          {!loading && message && <p>{message}</p>}
          {!loading && history.length > 0 && (
            <ul className="list-disc pl-5">
              {history.map((caption, index) => (
                <li data-testid="caption-item" key={index} className="mb-2 flex items-center justify-between gap-2">
                <span className="flex-1">{caption}</span>
                <div className="flex gap-2">
                  <FaCopy className="cursor-pointer" onClick={() => navigator.clipboard.writeText(caption)}/>
                  <MdDelete className="cursor-pointer" />
                </div>
              </li>              
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="relative z-10">
          No Interactions Yet{" "}
          <NavLink
            data-testid = "go-back-link"
            className="underline text-blue-400"
            to = "/"
          >
            Go Back
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default History;
