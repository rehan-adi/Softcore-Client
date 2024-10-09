import React, { useEffect, useState } from 'react';


const TopNavbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isLoggedIn = false;

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      console.log('User logged out');
      // Implement logout functionality here
    } else {
      console.log('Redirect to login page');
      // Implement login redirect functionality here
    }
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

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
      {/* Logo */}
      <div className="text-white text-lg font-bold">
        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Login/Logout Button */}
      <div>
        <button
          onClick={handleLoginLogout}
          className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
