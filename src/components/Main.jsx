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
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
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
          language,
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
  return (
    <form onSubmit={handleGenerate} className="w-full max-w-2xl">
  <div className="relative rounded-xl border border-gray-500 bg-neutral-800 dark:bg-gray-800 p-4 text-sm text-white space-y-2 focus:right-2 focus:ring-neutral-400">
    {/* Textarea */}
    <textarea
      value={keywords}
      onChange={(e) => setKeywords(e.target.value)}
      placeholder="Enter keywords to be included in caption"
      rows={5}
      className="w-full resize-none bg-transparent text-white placeholder-gray-400 focus:outline-none"
    />

    {/* Dropdowns + button */}
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-2 py-1 rounded bg-gray-700 text-sm text-white border border-gray-600 focus:outline-none"
      >
        <option disabled value="">Type</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Selfie">Selfie</option>
        <option value="Fitness">Fitness</option>
        <option value="Fashion">Fashion</option>
      </select>

      <select
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        className="px-2 py-1 rounded bg-gray-700 text-sm text-white border border-gray-600 focus:outline-none"
      >
        <option disabled value="">Emoji's</option>
        <option value="None">None</option>
        <option value="Minimal">Minimal</option>
        <option value="Heavy">Heavy</option>
      </select>

      <select
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="px-2 py-1 rounded bg-gray-700 text-sm text-white border border-gray-600 focus:outline-none"
      >
        <option disabled value="">Length</option>
        <option value="Short">Short</option>
        <option value="Medium">Medium</option>
        <option value="Long">Long</option>
      </select>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-2 py-1 rounded bg-gray-700 text-sm text-white border border-gray-600 focus:outline-none"
      >
        <option disabled value="">Language</option>
        <option value="Hindi">Hindi</option>
        <option value="English">English</option>
        
      </select>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="px-2 py-1 rounded bg-gray-700 text-sm text-white border border-gray-600 focus:outline-none"
      >
        <option disabled value="">Tone</option>
        <option value="Funny">Funny</option>
        <option value="Romantic">Romantic</option>
        <option value="Motivational">Motivational</option>
        <option value="Sarcastic">Sarcastic</option>
        <option value="Chill">Chill</option>
      </select>

      {/* Icon-only submit button */}
      <button
        type="submit"
        disabled={loading}
        className="p-2 ml-auto rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-lg" />
        ) : (
          <RiAiGenerate2 className="text-lg" />
        )}
      </button>
    </div>
  </div>
</form>

  );
}

export default Main;
