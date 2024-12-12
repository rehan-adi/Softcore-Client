import axios from 'axios'
import { getToken } from '../utils/token'
import { useEffect, useState } from 'react'
import { BACKEND_API_URL } from '../constant'
import { useNavigate } from 'react-router-dom'

function Following() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [following, setFollowing] = useState([])

  useEffect(() => {
    const fetchUserFollowing = async () => {
      const token = getToken()

      setLoading(true)
      try {
        const response = await axios.get(`${BACKEND_API_URL}/user/following`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          setFollowing(response.data.following)
        }
      } catch (error) {
        console.error('Error fetching followers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserFollowing()
  }, [])

  const goToUserProfile = id => {
    navigate(`/profile/${id}`)
  }

  if (loading) {
    return (
      <div className='mt-6 flex min-h-screen w-full flex-col items-center justify-start bg-black px-4 text-white lg:mt-10'>
        <h1 className='mb-12 text-xl font-semibold'>Following</h1>
        <ul className='w-full space-y-4 md:px-[395px]'>
          {[1, 2, 3].map((_, index) => (
            <li
              key={index}
              className='flex animate-pulse items-center rounded-lg bg-[#27272A] px-4 py-3'
            >
              <div className='flex items-center'>
                <div className='mr-4 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                <div className='flex flex-col'>
                  <div className='mb-1 h-5 w-32 rounded bg-gray-200 dark:bg-gray-700'></div>
                  <div className='h-4 w-24 rounded bg-gray-200 dark:bg-gray-700'></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className='mt-6 flex min-h-screen w-full flex-col items-center justify-start bg-black px-4 text-white lg:mt-10'>
      <h1 className='mb-12 text-xl font-semibold'>Following</h1>

      {Array.isArray(following) && following.length > 0 ? (
        <ul className='w-full space-y-4 md:px-[395px]'>
          {following.map(following => (
            <li
              key={following._id}
              onClick={() => goToUserProfile(following._id)}
              className='flex w-full cursor-pointer items-center rounded-lg bg-[#F9FAFB0D] px-4 py-3 hover:bg-neutral-900'
            >
              <div className='flex items-center gap-2'>
                <img
                  src={following.profilePicture}
                  alt={`${following.username}'s profile picture`}
                  className='mr-4 h-8 w-8 rounded-full object-cover'
                />

                {/* User Info: Name, Username */}
                <div className='flex flex-col'>
                  <span className='text-base font-semibold'>
                    {following.fullname}
                  </span>
                  <span className='text-sm text-gray-300'>
                    @{following.username}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center text-base text-gray-400'>
          No followers found.
        </p>
      )}
    </div>
  )
}

export default Following
