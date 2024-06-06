import React from "react";
import { LuUser2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

function BottomNavbar() {
  return (
    <div className="lg:hidden fixed bottom-0 w-full bg-[#0A090F] border-t border-white border-opacity-25 flex justify-around items-center py-4 px-3">
      <nav className="flex justify-between w-full max-w-sm mx-auto">
        {/* Home icon */}
        <button className="text-white">
          <svg
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
            className="w-7 h-7"
          >
            <g>
              <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path>
            </g>
          </svg>
        </button>

        {/* Search icon */}
        <button className="text-white">
          <IoSearch className="text-3xl" />
        </button>

        {/* Profile icon */}
        <button className="text-white">
          <LuUser2 className="text-3xl" />
        </button>

        {/* Premium icon */}
        <button className="text-white">
          <svg
            width="28"
            height="28"
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 187.47 94.63"
            fill="currentColor"
          >
            <g fill="currentColor">
              <polygon points="100.99 45.87 120.42 35.22 120.42 8.22 27.09 59.79 27.09 86.41 71.84 61.56 71.84 46.99 87.44 38.3 100.99 45.87"></polygon>
              <polygon points="0 87.63 12.61 94.54 24.29 88 24.29 36.9 0 23.26 0 87.63"></polygon>
              <polygon points="74.64 48.67 74.64 61.47 135.18 94.63 147.41 87.81 147.41 75.3 88.09 41.2 74.64 48.67"></polygon>
              <polygon points="70.91 32.42 12.05 0 0 6.63 0 20.18 46.43 45.96 70.91 32.42"></polygon>
              <polygon points="123.22 6.73 123.22 58.39 147.41 71.84 147.41 7.1 134.99 0.19 123.22 6.73"></polygon>
              <path d="M177.78,14.27c0-3.41-2.27-5.9-6.61-5.9h-7V25.53h4.21V19.81H171l2.88,5.72h4.69L174.85,19A5.14,5.14,0,0,0,177.78,14.27Zm-6.61,2.06h-2.84v-4h2.84c1.49,0,2.36.7,2.36,1.93C173.53,15.79,172.39,16.33,171.17,16.33Z"></path>
              <path d="M187.47,17.17a17,17,0,0,0-17-17h0a17,17,0,1,0,17,17Zm-16.9,14.09h-.12a14,14,0,1,1,.12,0Z"></path>
            </g>
          </svg>
        </button>

        {/* Message icon */}
        <button className="text-white">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="white"
            className="w-7 h-7"
          >
            <g>
              <path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path>
            </g>
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default BottomNavbar;
