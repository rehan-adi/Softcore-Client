import React, { useState } from "react";

const Settings = () => {
  const [activeSetting, setActiveSetting] = useState("changePassword");

  return (
    <div className="min-h-screen flex justify-start pt-5 md:px-40 items-center flex-col w-full bg-black text-white">
      <div className="border-b py-7 md:px-10 border-white border-opacity-15">
        <ul className="flex gap-8 items-center">
          <li>
            <span
              className={`w-full p-2 cursor-pointer transition 
                ${
                  activeSetting === "changePassword"
                    ? "md:border-b-4 border-b-2 border-white"
                    : "md:hover:border-b-4 hover:border-b-2 hover:border-white"
                }
            `}
              onClick={() => setActiveSetting("changePassword")}
            >
              Change Password
            </span>
          </li>
          <li>
            <span
              className={`w-full p-2 cursor-pointer transition 
            ${
              activeSetting === "deleteAccount"
                ? "md:border-b-4 border-b-2 border-white"
                : "md:hover:border-b-4 hover:border-b-2  hover:border-white"
            }
             `}
              onClick={() => setActiveSetting("deleteAccount")}
            >
              Delete Account
            </span>
          </li>
        </ul>
      </div>
      <main className="flex flex-col items-center mt-10 justify-center">
        {activeSetting === "changePassword" && (
          <div className="p-5 rounded-lg shadow-md w-full max-w-lg">
            <h1 className="text-xl font-semibold mb-5">Change Password</h1>
            <input
              type="password"
              placeholder="Enter New Password"
              className="shadow appearance-none border rounded-full border-opacity-30 border-white bg-transparent w-full py-3 px-5 text-white leading-tight mb-3 focus:border-opacity-55 focus:outline-none focus:shadow-outline placeholder:text-white"
            />
            <button className="bg-white mt-5 w-44 font-semibold text-black px-4 py-2 rounded-full transition">
              Update Password
            </button>
          </div>
        )}
        {activeSetting === "deleteAccount" && (
          <div className="p-5 rounded-lg shadow-md w-full max-w-lg">
            <h1 className="text-2xl mb-2">Delete Account</h1>
            <p className="text-red-500">This will delete your account and all associated data.</p>
            <button className="bg-white text-black mt-8 w-40 font-semibold px-4 py-2 rounded-full">
              Delete Account
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;
