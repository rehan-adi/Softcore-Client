import { toast } from "react-hot-toast";
import { LuUser2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import CreatePostModal from "./CreatePostModels";
import { MdLogout, MdLogin } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getToken, removeToken } from "../utils/token";

function SideNavbar() {

  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = (postData) => {
    console.log("Posting data to backend:", postData);
    closeModal();
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    toast.success("You are logged out now");
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen z-50 fixed bg-[#09090A] md:flex md:flex-col hidden border-r border-white border-opacity-20 w-[250px]">
      <nav className="w-full flex border-b border-white border-opacity-20 py-4 justify-center items-center">
        <svg
          width="50"
          height="50"
          className="text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 187.47 94.63"
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
      </nav>
      <div className="flex justify-center py-10 items-center text-white">
        <ul className="flex items-start flex-col px-2 gap-3">
          {/* Home item */}
          <Link to="/"  className={`font-semibold text-base ${
              isActive("/") ? "bg-[#27272A] pr-20" : ""
            } hover:bg-[#27272A] py-2 w-40 rounded-lg p-2`}>
            <li className="flex gap-1 items-center">
              <span className="mr-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden="true"
                  className="w-5 h-5"
                >
                  <g>
                    <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path>
                  </g>
                </svg>
              </span>
              <span className="font-semibold text-base">Home</span>
            </li>
          </Link>


          {/* Search item */}
         <Link to="/search" className={`font-semibold text-sm ${
              isActive("/search") ? "bg-[#27272A]" : ""
            } hover:bg-[#27272A] py-2 w-40 rounded-lg p-2`}>
         <li className="flex gap-1 items-center">
            <span className="mr-1.5">
              <IoSearch className="text-2xl" />
            </span>
            <span className="font-semibold text-base">Search</span>
          </li>
         </Link>

          {/* Profile item */}
          <Link to="profile" className={`font-semibold text-sm ${
              isActive("/profile") ? "bg-[#27272A]" : ""
            } hover:bg-[#27272A] py-2 w-40 rounded-lg p-2`}>
            <li className="flex gap-1 items-center">
              <span className="mr-1.5">
                <LuUser2 className="text-2xl" />
              </span>
              <span className="font-semibold text-base">Profile</span>
            </li>
          </Link>

          <Link to="/premium" className={`font-semibold text-sm ${
              isActive("/premium") ? "bg-[#27272A]" : ""
            } hover:bg-[#27272A] py-2 w-40 rounded-lg p-2`}>
            <li className="flex gap-2 items-center">
              <span className="mr-1">
                <svg
                  width="24"
                  height="24"
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
              </span>
              <span className="font-semibold text-base">Premium</span>
            </li>
          </Link>

        <Link to="/message" className={`font-semibold text-sm ${
              isActive("/message") ? "bg-[#27272A]" : ""
            } hover:bg-[#27272A] py-2 w-40 rounded-lg p-2`}>
        <li className="flex gap-1 items-center">
            <span className="mr-2.5">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="white"
                className="w-5 h-5"
              >
                <g>
                  <path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path>
                </g>
              </svg>
            </span>
            <span className="font-semibold text-base">Message</span>
          </li>
        </Link>


          <li className="flex gap-3 ml-1 items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-base hover:bg-[#27272A] w-40 rounded-lg p-2 text-white gap-3"
              >
                <MdLogout className="text-xl mr-1" />
                <span className="font-semibold text-base">Logout</span>
              </button>
            ) : (
              <Link to="/signin" className={`font-semibold text-sm ${
                isActive("/signin") ? "bg-[#27272A]" : ""
              } hover:bg-[#27272A] py-2 w-40 rounded-lg p-2`}>
                <button className="flex items-center text-white gap-3">
                  <MdLogin className="text-2xl " />
                  <span className="font-semibold text-base">Login</span>
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="flex justify-center mt-36 items-center text-white">
        <button
          onClick={openModal}
          className="py-2 px-4 bg-white font-semibold text-black rounded-full"
        >
          Create a Post
        </button>
        {showModal && (
          <CreatePostModal onClose={closeModal} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}

export default SideNavbar;
