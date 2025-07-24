import React from "react";
import { useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiAiGenerate2 } from "react-icons/ri";


function Main({ setCaption }) {
  const [type, setType] = useState("");
  const [tone, setTone] = useState("");
  const [keywords, setKeywords] = useState("");
  const [emoji, setEmoji] = useState("");
  const [length, setLength] = useState("");
  const [language, setLanguage] = useState("")
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${baseURL}/generate`,
        {
          type,
          tone,
          keywords,
          emoji,
          length, 
          language
        },
        { withCredentials: true }
      );
      const raw = res.data.caption;
      const captions = raw
        .split(/\n\d+\.\s*/) // split by newlines followed by a number + dot
        .filter(Boolean);
      setCaption(captions || []);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Shared classes for form elements with neutral-800 background
  const inputClasses = "w-full rounded-xl border border-neutral-600 bg-neutral-800 p-4 text-sm text-neutral-100 placeholder-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-neutral-500";

  return (
    <>
      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Keywords Textarea */}
        <div className="space-y-2">
          <label htmlFor="keywords" className="block text-sm font-medium text-neutral-200">
            Keywords
          </label>
          <textarea
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords to be included in caption"
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Type Dropdown */}
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-neutral-200">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClasses}
            >
              <option disabled value="">
                Select Type
              </option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Selfie">Selfie</option>
              <option value="Fitness">Fitness</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Tone Dropdown */}
          <div className="space-y-2">
            <label htmlFor="tone" className="block text-sm font-medium text-neutral-200">
              Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className={inputClasses}
            >
              <option disabled value="">
                Select Tone
              </option>
              <option value="Funny">Funny</option>
              <option value="Romantic">Romantic</option>
              <option value="Motivation">Motivational</option>
              <option value="Sarcastic">Sarcastic</option>
              <option value="Chill">Chill</option>
            </select>
          </div>

          {/* Emoji Dropdown */}
          <div className="space-y-2">
            <label htmlFor="emoji" className="block text-sm font-medium text-neutral-200">
              Emojis
            </label>
            <select
              id="emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className={inputClasses}
            >
              <option disabled value="">
                Select Emojis
              </option>
              <option value="None">None</option>
              <option value="Minimal">Minimal</option>
              <option value="Heavy">Heavy</option>
            </select>
          </div>

          {/* Length Dropdown */}
          <div className="space-y-2">
            <label htmlFor="length" className="block text-sm font-medium text-neutral-200">
              Length
            </label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className={inputClasses}
            >
              <option disabled value="">
                Select Length
              </option>
              <option value="Short">Short</option>
              <option value="Medium">Medium</option>
              <option value="Long">Long</option>
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="space-y-2">
            <label htmlFor="language" className="block text-sm font-medium text-neutral-200">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={inputClasses}
            >
              <option disabled value="">
                Select Language
              </option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium text-sm rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Generating...
              </>
            ) : (
              <>
                <RiAiGenerate2 className="-ml-1 mr-2 h-4 w-4" />
                Generate Caption
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default Main;
