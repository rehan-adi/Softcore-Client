import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";

function Home() {
  return (
    <div className="relative">
      <SideNavbar />
      <div className="absolute bg-[#0A090F] text-white min-h-screen top-0 w-full lg:w-[80vw] right-0">
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  );
} 

export default Home;
