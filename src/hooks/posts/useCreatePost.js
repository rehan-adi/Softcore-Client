import axios from 'axios'
import { toast } from 'react-hot-toast'
import { getToken } from '../../utils/token'
import { useState, useCallback } from 'react'
import { useGetPost } from '../posts/useGetPost'
import { BACKEND_API_URL } from '../../constant'

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false)
  const { fetchBlogs } = useGetPost()

  const onSubmitForm = useCallback(
    async (data, onClose) => {
      const token = getToken('token')

      if (!token) {
        toast.error('Please login to create a post')
        if (onClose) onClose()
        return
      }

      const formData = new FormData()
      formData.append('content', data.content)
      formData.append('category', data.category)
      const tagsArray = Array.isArray(data.tags)
        ? data.tags
        : (data.tags || '')
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)

      tagsArray.forEach(tag => formData.append('tags[]', tag))

      if (data.image) {
        formData.append('image', data.image)
      } else {
        console.log('Image is null')
      }

      setLoading(true)
      try {
        const response = await axios.post(
          `${BACKEND_API_URL}/posts/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          }
        )
        if (response.status === 201) {
          await fetchBlogs()
          toast.success('Post created successfully!')
          onClose()
          return
        }
      } catch (error) {
        console.error('Error creating post:', error)
        toast.error(
          error.response?.data?.message ||
            'Error creating post. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    },
    [fetchBlogs]
  )

  return {
    loading,
    onSubmitForm
  }
}
