import { GiCheckMark } from "react-icons/gi";

function Premium() {
  return (
    <div className="min-h-screen px-4 py-12 w-full bg-black text-white">
      <h1 className="text-3xl lg:text-5xl text-center font-bold">Upgrade to Premium</h1>
      <div className="flex flex-col-reverse md:flex-row mt-10 md:mt-20 justify-center items-center gap-14 md:gap-12">
        {/* Basic Plan */}
        <div className="w-full md:w-[22%] rounded-md px-6 py-10 shadow-2xl shadow-[#111112] bg-[#111112] flex flex-col">
          <h1 className="font-normal tracking-tight mb-4 text-2xl">Basic</h1>
          <span className="text-3xl font-semibold">₹0</span>
          <ul className="mt-7 flex flex-col gap-3 flex-grow">
            {[
              "Needs to be Sign in",
              "Limited Access",
              "Create post",
              "Edit post",
              "Delete post",
              "Comment",
              "Like",
            ].map((item) => (
              <li key={item} className="flex items-center">
                <GiCheckMark className="inline-block text-lg mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="w-full md:w-[22%] rounded-md px-6 py-12 shadow-2xl shadow-[#0c8ded] bg-[#0c8ded] flex flex-col">
          <h1 className="font-normal tracking-tight mb-4 text-2xl">Premium</h1>
          <span className="text-3xl font-semibold">
            ₹10 <span className="text-sm">/ Annually</span>
          </span>
          <ul className="mt-7 flex flex-col gap-3 flex-grow">
            {[
              "Small reply boost",
              "Longer posts",
              "Unlimited posts",
              "Chat with AI",
            ].map((item) => (
              <li key={item} className="flex items-center">
                <GiCheckMark className="inline-block text-lg mr-2" />
                {item}
              </li>
            ))}
          </ul>
          <button className="px-7 py-2 mt-10 rounded-full w-full bg-white text-black font-semibold">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
