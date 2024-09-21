import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";
import NewsPost from "../components/NewsPost";

function Home() {
  return (
    <div className="relative">
      <SideNavbar />
      <div className="absolute bg-black text-white min-h-screen top-0 w-full lg:w-[85vw] right-0">
        <Outlet />
      </div>
      {/* <div className="bg-red-600 lg:flex hidden absolute right-0">
        <NewsPost />
      </div> */}
      <BottomNavbar />
    </div>
  );
}

export default Home;
