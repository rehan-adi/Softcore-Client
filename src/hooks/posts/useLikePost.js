import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useGetPost } from './useGetPost'
import { getToken } from '../../utils/token'
import { useCallback, useState } from 'react'
import { BACKEND_API_URL } from '../../constant'

export const useLikePost = () => {
  const { fetchBlogs } = useGetPost()
  const [loading, setLoading] = useState(false)

  const handleLikePost = useCallback(
    async postId => {
      const token = getToken()
      if (!token) {
        toast.error('You must be logged in to like a post.')
        return
      }

      try {
        setLoading(true)

        const response = await axios.post(
          `${BACKEND_API_URL}/likes/${postId}/toggle-like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        await fetchBlogs()

        toast.success(response.data.message)
      } catch (error) {
        console.error('Error liking/unliking post:', error)
        toast.error('Error updating like. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [fetchBlogs]
  )

  return { handleLikePost, loading }
}
