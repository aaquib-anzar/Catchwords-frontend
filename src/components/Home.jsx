import React, { useContext, useState } from "react";
import Main from "./Main";
import { CaptionBox } from "./CaptionBox";
import { ColourfulText } from "./ui/colourful-text";

function Home() {
  const [caption, setCaption] = useState([]);
  const filteredCaptions = caption.slice(1); // remove first element
  return (
    <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-[80px] pb-10">
      {/* Hero Text */}
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white font-sans mb-4">
        Find your <ColourfulText text="Captions" /> here.
      </h1>

      {/* Caption Generator */}
      <div className="w-full max-w-2xl bg-neutral-800 dark:bg-gray-900 rounded-xl shadow-md p-6">
        <Main setCaption={setCaption} />
      </div>

      {/* Captions */}
      <ul className="text-white mt-6 space-y-3 w-full max-w-2xl">
        {caption.length > 0 && (
          <h1 className="pl-4 text-base md:text-lg font-medium text-white">
            {caption[0]}
          </h1>
        )}
        {filteredCaptions.map((cap, i) => (
          <CaptionBox key={i} caption={cap} />
        ))}
      </ul>
    </main>
  );
}

export default Home;
