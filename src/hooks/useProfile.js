import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BACKEND_API_URL } from '../constant'
import { useEffect, useCallback } from 'react'
import { useProfileStore } from '../store/useProfileStore'
import { getToken, getUserIdFromToken } from '../utils/token'

export const useProfile = () => {
  const { setProfileData, setPosts, setLoading } = useProfileStore()

  const fetchProfileData = useCallback(async () => {
    setLoading(true)
    try {
      const token = getToken('token')
      if (!token) {
        return
      }

      const userId = getUserIdFromToken(token)
      if (!userId) {
        toast.error('User ID not found in token. Please log in again.')
        return
      }

      const response = await axios.get(`${BACKEND_API_URL}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Store profile data and posts
      setProfileData(response.data.profile)
      setPosts(response.data.posts)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Error fetching profile data. Please try again later.'
      toast.error(errorMessage)
      console.error('Error fetching profile data:', error)
    } finally {
      setLoading(false)
    }
  }, [setProfileData, setPosts, setLoading])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  return { fetchProfileData }
}
