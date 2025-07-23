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

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://catchwords-backend.onrender.com/generate",
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
  return (
    <>
      <form onSubmit={handleGenerate}>
        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords to be included in caption"
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 m-2 rounded bg-gray-100 dark:bg-gray-800 text-sm"
        >
          <option disabled value="">
            Type
          </option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Selfie">Selfie</option>
          <option value="Fitness">Fitness</option>
          <option value="Fashion">Fashion</option>
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="p-2 m-2 rounded bg-gray-100 dark:bg-gray-800 text-sm"
        >
          <option disabled value="">
            Tone
          </option>
          <option value="Funny">Funny</option>
          <option value="Romantic">Romantic</option>
          <option value="Motivation">Motivational</option>
          <option value="Sarcastic">Sarcastic</option>
          <option value="Chill">Chill</option>
        </select>

        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="p-2 rounded bg-gray-100 dark:bg-gray-800 text-sm"
        >
          <option disabled value="">
            Emoji's
          </option>
          <option value="None">None</option>
          <option value="Minimal">Minimal</option>
          <option value="Heavy">Heavy</option>
        </select>

        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="p-2  m-2 rounded bg-gray-100 dark:bg-gray-800 text-sm"
        >
          <option disabled value="">
            Length
          </option>
          <option value="Short">Short</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
        </select>


        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2  m-2 rounded bg-gray-100 dark:bg-gray-800 text-sm"
        >
          <option disabled value="">
            Language
          </option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>


        <button
          type="submit"
          disabled={loading}
          className="p-2 m-2 bg-gray-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? <AiOutlineLoading3Quarters /> : <RiAiGenerate2 />}
        </button>
      </form>
    </>
  );
}

export default Main;
