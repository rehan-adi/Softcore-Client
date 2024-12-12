import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BACKEND_API_URL } from '../../constant'
import { getToken, removeToken } from '../../utils/token'

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChangePassword = useCallback(async password => {
    setLoading(true)
    try {
      const token = getToken('token')
      const response = await axios.put(
        `${BACKEND_API_URL}/auth/change-password`,
        password,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        toast(
          'Password updated successfully. Please log in again to continue.',
          { icon: '🔐' }
        )
        removeToken()
        navigate('/signin')
      }
    } catch (error) {
      console.error(error)
      const message =
        error.response?.data?.message ||
        'Failed to change password. Please try again.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { handleChangePassword, loading }
}
