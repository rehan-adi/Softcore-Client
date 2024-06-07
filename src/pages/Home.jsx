import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SideNavbar />
      <div className="flex-1 ml-52 p-5">
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  );
} 

export default Home;
