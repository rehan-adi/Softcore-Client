import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BACKEND_API_URL } from '../../constant'
import { useState, useEffect, useCallback } from 'react'
import { usePostsStore } from '../../store/usePostsStore'

export const useGetPost = () => {
  const { loading, setLoading, posts, setPosts } = usePostsStore()
  const [error, setError] = useState(null)

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${BACKEND_API_URL}/posts/allpost`)
      if (response.status === 200) {
        setPosts(Array.isArray(response.data.data) ? response.data.data : [])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError(error.response?.data?.message || 'Error fetching data')
      toast.error('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }, [setPosts, setLoading])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  return {
    loading,
    posts,
    error,
    fetchBlogs
  }
}
