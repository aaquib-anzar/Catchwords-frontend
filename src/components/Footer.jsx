import React from "react";

function Footer() {
  return (
    <footer className="w-full z-50 px-6 py-4 bg-black/40 backdrop-blur-md text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Left - Copyright */}
        <div className="text-sm">© {new Date().getFullYear()} Catchword.ai</div>

        {/* Center - GitHub */}
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
        >
          GitHub
        </a>

        {/* Right - Twitter */}
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
}

export default Footer;
