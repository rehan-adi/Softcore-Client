import { toast } from 'react-hot-toast'
import { IoSearch } from 'react-icons/io5'
import { useCallback, useState } from 'react'
import CreatePostModal from './CreatePostModels'
import useAuthStore from '../store/useAuthStore'
import { MdLogout, MdLogin } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { Loader2, Settings, User2 } from 'lucide-react'
import { useProfileStore } from '../store/useProfileStore'

function SideNavbar() {
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()
  const { isLoggedIn, logout } = useAuthStore()
  const { profileData, loading } = useProfileStore()

  const isActive = useCallback(
    path => location.pathname === path,
    [location.pathname]
  )

  const handleSubmit = () => {
    closeModal()
  }

  const handleLogout = () => {
    logout()
    toast.success('You are logged out now')
  }

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className='fixed z-50 hidden min-h-screen w-[250px] border-r border-white border-opacity-20 bg-black md:flex md:flex-col'>
      <nav className='flex w-full items-center justify-center border-b border-white border-opacity-20 py-4'>
        <Link to='/'>
          <svg
            width='50'
            height='50'
            className='text-white'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 187.47 94.63'
          >
            <g fill='currentColor'>
              <polygon points='100.99 45.87 120.42 35.22 120.42 8.22 27.09 59.79 27.09 86.41 71.84 61.56 71.84 46.99 87.44 38.3 100.99 45.87'></polygon>
              <polygon points='0 87.63 12.61 94.54 24.29 88 24.29 36.9 0 23.26 0 87.63'></polygon>
              <polygon points='74.64 48.67 74.64 61.47 135.18 94.63 147.41 87.81 147.41 75.3 88.09 41.2 74.64 48.67'></polygon>
              <polygon points='70.91 32.42 12.05 0 0 6.63 0 20.18 46.43 45.96 70.91 32.42'></polygon>
              <polygon points='123.22 6.73 123.22 58.39 147.41 71.84 147.41 7.1 134.99 0.19 123.22 6.73'></polygon>
              <path d='M177.78,14.27c0-3.41-2.27-5.9-6.61-5.9h-7V25.53h4.21V19.81H171l2.88,5.72h4.69L174.85,19A5.14,5.14,0,0,0,177.78,14.27Zm-6.61,2.06h-2.84v-4h2.84c1.49,0,2.36.7,2.36,1.93C173.53,15.79,172.39,16.33,171.17,16.33Z'></path>
              <path d='M187.47,17.17a17,17,0,0,0-17-17h0a17,17,0,1,0,17,17Zm-16.9,14.09h-.12a14,14,0,1,1,.12,0Z'></path>
            </g>
          </svg>
        </Link>
      </nav>
      <div className='flex items-center justify-center py-10 text-white'>
        <ul className='flex flex-col items-start gap-3 px-2'>
          {/* Home item */}
          <Link
            to='/'
            className={`text-base font-semibold ${
              isActive('/') ? 'bg-[#27272A] pr-20' : ''
            } w-40 rounded-lg p-2 py-2 hover:bg-[#27272A]`}
          >
            <li className='flex items-center gap-1'>
              <span className='mr-2'>
                <svg
                  viewBox='0 0 24 24'
                  fill='white'
                  aria-hidden='true'
                  className='h-5 w-5'
                >
                  <g>
                    <path d='M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z'></path>
                  </g>
                </svg>
              </span>
              <span className='text-base font-semibold'>Home</span>
            </li>
          </Link>

          {/* Search item */}
          <Link
            to='/search'
            className={`text-sm font-semibold ${
              isActive('/search') ? 'bg-[#27272A]' : ''
            } w-40 rounded-lg p-2 py-2 hover:bg-[#27272A]`}
          >
            <li className='flex items-center gap-1'>
              <span className='mr-1.5'>
                <IoSearch className='text-2xl' />
              </span>
              <span className='text-base font-semibold'>Search</span>
            </li>
          </Link>

          {/* Profile item */}
          <Link
            to='/profile'
            className={`text-sm font-semibold ${isActive('/profile') ? 'bg-[#27272A]' : ''} w-40 rounded-lg p-2 py-2 hover:bg-[#27272A]`}
          >
            <div className='flex items-center justify-start gap-3'>
              {loading ? (
                <Loader2 className='h-7 w-6 animate-spin' />
              ) : profileData?.profilePicture ? (
                <img
                  src={profileData.profilePicture}
                  alt='Profile'
                  className='h-7 w-7 rounded-full border-2 border-white'
                />
              ) : (
                <User2 />
              )}
              <span className='text-base font-semibold'>Profile</span>
            </div>
          </Link>

          <Link
            to='/premium'
            className={`text-sm font-semibold ${
              isActive('/premium') ? 'bg-[#27272A]' : ''
            } w-40 rounded-lg p-2 py-2 hover:bg-[#27272A]`}
          >
            <li className='flex items-center gap-2'>
              <span className='mr-1'>
                <svg
                  width='24'
                  height='24'
                  className='text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 187.47 94.63'
                  fill='currentColor'
                >
                  <g fill='currentColor'>
                    <polygon points='100.99 45.87 120.42 35.22 120.42 8.22 27.09 59.79 27.09 86.41 71.84 61.56 71.84 46.99 87.44 38.3 100.99 45.87'></polygon>
                    <polygon points='0 87.63 12.61 94.54 24.29 88 24.29 36.9 0 23.26 0 87.63'></polygon>
                    <polygon points='74.64 48.67 74.64 61.47 135.18 94.63 147.41 87.81 147.41 75.3 88.09 41.2 74.64 48.67'></polygon>
                    <polygon points='70.91 32.42 12.05 0 0 6.63 0 20.18 46.43 45.96 70.91 32.42'></polygon>
                    <polygon points='123.22 6.73 123.22 58.39 147.41 71.84 147.41 7.1 134.99 0.19 123.22 6.73'></polygon>
                    <path d='M177.78,14.27c0-3.41-2.27-5.9-6.61-5.9h-7V25.53h4.21V19.81H171l2.88,5.72h4.69L174.85,19A5.14,5.14,0,0,0,177.78,14.27Zm-6.61,2.06h-2.84v-4h2.84c1.49,0,2.36.7,2.36,1.93C173.53,15.79,172.39,16.33,171.17,16.33Z'></path>
                    <path d='M187.47,17.17a17,17,0,0,0-17-17h0a17,17,0,1,0,17,17Zm-16.9,14.09h-.12a14,14,0,1,1,.12,0Z'></path>
                  </g>
                </svg>
              </span>
              <span className='text-base font-semibold'>Premium</span>
            </li>
          </Link>

          <Link
            to='/settings'
            className={`text-sm font-semibold ${
              isActive('/message') ? 'bg-[#27272A]' : ''
            } w-40 rounded-lg p-2 py-2 hover:bg-[#27272A]`}
          >
            <li className='flex items-center gap-1'>
              <span className='mr-2.5'>
                <Settings />
              </span>
              <span className='text-base font-semibold'>Settings</span>
            </li>
          </Link>

          <li className='ml-1 flex items-center gap-3'>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className='flex w-40 items-center gap-3 rounded-lg p-2 text-base text-white hover:bg-[#27272A]'
              >
                <MdLogout className='mr-1 text-xl' />
                <span className='text-base font-semibold'>Logout</span>
              </button>
            ) : (
              <Link
                to='/signin'
                className={`text-sm font-semibold ${
                  isActive('/signin') ? 'bg-[#27272A]' : ''
                } w-40 rounded-lg p-2 py-2 hover:bg-[#27272A]`}
              >
                <button className='flex items-center gap-3 text-white'>
                  <MdLogin className='text-2xl' />
                  <span className='text-base font-semibold'>Login</span>
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className='mt-36 flex items-center justify-center text-white'>
        <button
          onClick={openModal}
          className='rounded-full bg-white px-4 py-2 font-semibold text-black'
        >
          Create a Post
        </button>
        {showModal && (
          <CreatePostModal onClose={closeModal} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}

export default SideNavbar
