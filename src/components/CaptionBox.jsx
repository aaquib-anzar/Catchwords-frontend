("use client");
import React, { useState, useContext } from "react";
import { FaCopy } from "react-icons/fa6";
import { GlowingEffect } from "./ui/glowing-effect";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import { GiSaveArrow } from "react-icons/gi";
import { toast } from 'react-toastify';

export function CaptionBox({ caption }) {
  const { user } = useContext(AuthContext);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(caption);
      toast.success("Copied to clipboard.")
      
    } catch (error) {
      console.error("Handle copy error", error.message)
      toast.error("Something went wrong");
    }
  };
  const handleSave = async() => {
    try {
      if(user?.email){
        const res = await axios.post(`${baseURL}/savecaption`,{email:user?.email, caption},{withCredentials:true})
        toast.success(res.data.message)
      }else{
        toast.success("Login to save the caption")
      }
    } catch (error) {
      console.error("Save copy error", error.message)
      toast.error("Something went wrong")
    }
  }
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
                <TypeAnimation
                  sequence={[description, Infinity]}
                  speed={70}
                  cursor={false}
                />
              </h2>

              <div className="ml-4 w-fit rounded-lg border border-gray-600 p-2 bg-black/50 backdrop-blur-md flex gap-2">
                <button
                  onClick={handleCopy}
                  className= "p-2 text-white dark:text-neutral-400 transition-opacity rounded-md hover:opacity-80"
                >
                    <FaCopy className="h-4 w-4" />
                </button>

                <button onClick = {handleSave}className="p-2 text-white dark:text-neutral-400 hover:opacity-80 transition-opacity rounded-md">
                  <GiSaveArrow className="h-4 w-4" />
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
    <>
    <div className="max-w-4xl mx-auto px-4">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-auto gap-4">
        <GridItem description={caption} />
      </ul>
    </div>
   
    </>
  );
}
