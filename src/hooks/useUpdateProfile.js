import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BACKEND_API_URL } from '../constant'
import { useProfileStore } from '../store/useProfileStore'
import { getToken, getUserIdFromToken } from '../utils/token'

export const useUpdateProfile = () => {
  const { setProfileData, setLoading } = useProfileStore()

  const updateProfile = async editFormData => {
    setLoading(true)
    try {
      const token = getToken('token')
      const id = getUserIdFromToken(token)

      const formData = new FormData()
      formData.append('username', editFormData.username)
      formData.append('bio', editFormData.bio)
      formData.append('image', editFormData.profilePicture)

      const response = await axios.patch(
        `${BACKEND_API_URL}/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setProfileData(response.data.profile)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error(
        error.response?.data?.message || 'Error updating profile. Try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return { updateProfile }
}
