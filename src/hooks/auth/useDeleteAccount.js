import axios from 'axios'
import { toast } from 'react-hot-toast'
import { getToken } from '../../utils/token'
import { useState, useCallback } from 'react'
import { BACKEND_API_URL } from '../../constant'

export const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false)

  const handleAccountDelete = useCallback(async () => {
    setLoading(true)
    try {
      const token = getToken('token')
      const response = await axios.delete(
        `${BACKEND_API_URL}/auth/delete-account`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        toast.success('Account deleted successfully')
      }
    } catch (error) {
      console.error(error)
      const message =
        error.response?.data?.message ||
        'Failed to delete account. Please try again.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { handleAccountDelete, loading }
}
