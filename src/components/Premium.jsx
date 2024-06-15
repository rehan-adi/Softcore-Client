import React from "react";
import { FaCheck } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";

function Premium() {
  return (
    <div className="min-h-screen lg:px-10 px-8 py-12 w-full bg-black text-white">
      <h1 className=";g:text-5xl text-3xl text-center font-bold">Upgrade to Premium</h1>
      <div className="flex mt-20 justify-center lg:flex-row flex-col-reverse items-center gap-16 lg:gap-12">
        <div className="lg:w-[20vw] w-full rounded-md px-6 py-7 lg:h-[58vh] h-[61vh] shadow-2xl shadow-[#111112] bg-[#111112]">
          <h1 className="font-normal tracking-tight mb-4 text-2xl">Basic</h1>
          <span className="text-3xl font-semibold">₹0</span>
          <ul className="mt-7 flex flex-col gap-3">
            <li>
              <span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>
              Needs to be Signin
            </li>
            <li>
              <span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>
              Limited Access
            </li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Create post</li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Edit post</li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Delete post</li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Comment</li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Like</li>
          </ul>
        </div>
        <div className="lg:w-[20vw] w-full px-6 py-7 rounded-md lg:h-[58vh] h-[60vh] shadow-2xl shadow-[#0c8ded] bg-[#0c8ded]">
          <h1 className="font-normal tracking-tight mb-4 text-2xl">Premium</h1>
          <span className="text-3xl font-semibold">
            ₹10 <span className="text-sm">/ Annualy</span>
          </span>
          <ul className="mt-7 flex flex-col gap-3">
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Small reply boost</li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Longer posts</li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Unlimited posts</li>
            <li><span>
                <GiCheckMark className="inline-block text-lg mr-2" />
              </span>Chat with AI</li>
          </ul>
          <button className="px-7 py-2 lg:mt-16 mt-10 rounded-full w-full bg-white text-black font-semibold">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
