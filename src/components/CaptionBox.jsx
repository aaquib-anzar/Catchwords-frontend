("use client");
import React, { useState, useContext } from "react";
import { FaCopy } from "react-icons/fa6";
import { GlowingEffect } from "./ui/glowing-effect";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";

export function CaptionBox({ caption }) {
  const{user} = useContext(AuthContext)
  const [copied, setCopied] = useState(false);
  const handleClick = async () => {
    try {
      navigator.clipboard.writeText(caption);
      setCopied(true);
      {user?.email && await axios.post(
        "http://localhost:5000/savecaption",
        { email:user?.email, caption },
        { withCredentials: true }
      )};
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert("Something went wrong");
    }
  };
  const GridItem = ({ description }) => {
    return (
      <li className="list-none">
        <div className="relative rounded-2xl border md:rounded-3xl h-full">
          {/* Glowing background effect */}
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />

          {/* Content layer on top of glowing effect */}
          <div className="relative z-10 flex flex-col gap-3 rounded-xl p-4 bg-black/20 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
            {/* Text and Copy Button in one row */}
            <div className="flex items-start justify-between">
              <h2 className="text-sm text-white md:text-base dark:text-neutral-400">
                {description}
              </h2>

              <div className="ml-4 w-fit rounded-lg border border-gray-600 p-2 bg-black/50 backdrop-blur-md">
                <button
                  onClick={handleClick}
                  disabled={copied}
                  className={`h-4 w-4 text-white dark:text-neutral-400 transition-opacity ${
                    copied
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-80"
                  }`}
                >
                  {copied ? <FaCopy /> : <FaCopy />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    // Grid Wrapper
    <div className="max-w-4xl mx-auto px-4">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-auto gap-4">
        <GridItem description={caption} />
      </ul>
    </div>
  );
}
