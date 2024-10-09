import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";

function Layout() {
  return (
    <div className="relative">
      <SideNavbar />
      <div className="absolute bg-black text-white min-h-screen top-0 w-full lg:w-[85vw] right-0">
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Layout;
