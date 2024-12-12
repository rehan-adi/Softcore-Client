import { Outlet } from 'react-router-dom'
import SideNavbar from '../components/SideNavbar'
import BottomNavbar from '../components/BottomNavbar'

function Layout() {
  return (
    <div className='relative'>
      <SideNavbar />
      <div className='absolute right-0 top-0 min-h-screen w-full bg-black text-white lg:w-[85vw]'>
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  )
}

export default Layout
