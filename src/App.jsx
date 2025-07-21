import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import { ColourfulText } from "./components/ui/colourful-text";
import { CaptionBox } from "./components/CaptionBox";
import Footer from "./components/Footer";


function App() {
  const [caption, setCaption] = useState([]);
  const filteredCaptions = caption.slice(1); // remove first element

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-neutral-900">
      {/* Backgrounds */}
      <ShootingStars className="absolute inset-0 z-0" />
      <StarsBackground className="absolute inset-0 z-0" />

      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-[80px] pb-10">
        {/* Hero Text */}
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white font-sans mb-4">
          Find your <ColourfulText text="Captions" /> here.
        </h1>

        {/* Caption Generator */}
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
