import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useAuthStore from '../store/useAuthStore'
import { MdLogout, MdLogin } from 'react-icons/md'
import { useCallback, useEffect, useState } from 'react'

function TopNavbar() {
  const { isLoggedIn, logout } = useAuthStore()

  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleLogout = () => {
    logout()
    toast.success('You are logged out now')
  }

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
    setLastScrollY(window.scrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY, controlNavbar])

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between bg-black px-6 py-4 shadow-lg transition-transform duration-300 md:hidden ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className='text-lg font-bold text-white'>
        <img src='/logo.svg' alt='Logo' className='h-10 w-auto' />
      </div>

      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className='flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-base text-black shadow-lg'
          >
            <MdLogout className='mr-1' size={22} />
            <span className='text-sm font-semibold'>Logout</span>
          </button>
        ) : (
          <Link to='/signin'>
            <button className='flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-base text-black shadow-lg'>
              <MdLogin className='mr-1' size={22} />
              <span className='text-sm font-semibold'>Login</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default TopNavbar
