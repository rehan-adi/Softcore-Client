import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
import useAuthStore from '../store/useAuthStore';
import { MdLogout, MdLogin } from "react-icons/md";
import { useCallback, useEffect, useState } from 'react';

function TopNavbar() {

  const { isLoggedIn, logout } = useAuthStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    toast.success("You are logged out now");
  };

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    }
  }, [lastScrollY, controlNavbar]);

  return (
    <nav
      className={`bg-black flex justify-between px-6 py-4 items-center w-full fixed top-0 z-50 shadow-lg md:hidden transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="text-white text-lg font-bold">
        <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
      </div>

      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center text-base bg-white rounded-full py-2 px-3 shadow-lg text-black gap-1"
          >
            <MdLogout className="text-xl mr-1" />
            <span className="font-semibold text-base">Logout</span>
          </button>
        ) : (
          <Link to="/signin">
            <button className="flex items-center text-base bg-white rounded-full py-2 px-3 shadow-lg text-black gap-1">
              <MdLogin className="text-2xl mr-1" />
              <span className="font-semibold text-base">Login</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default TopNavbar;
