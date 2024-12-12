import axios from 'axios'
import { Loader2, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_API_URL } from '../constant'
import { useNavigate } from 'react-router-dom'

const ImagePreview = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPostDetails = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/posts/post/${postId}`
        )
        if (response.status === 200) {
          setData(response.data.data.posts)
        }
      } catch (error) {
        const message =
          error.response?.data?.message ||
          'Something went wrong. Please try again.'
        toast.error(message)
        console.error("Error while getting Post detail's", error)
      } finally {
        setLoading(false)
      }
    }
    getPostDetails()
  }, [postId])

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-100 backdrop-blur transition-opacity duration-300'>
      <div className='absolute left-6 top-4 flex space-x-3'>
        <button
          onClick={() => navigate(-1)}
          className='rounded-full bg-neutral-800 p-2 text-white transition hover:rotate-90 hover:scale-105 hover:bg-neutral-700'
        >
          <X />
        </button>
      </div>
      {loading ? (
        <div className='flex h-full items-center justify-center'>
          <Loader2 className='mr-3 inline-block h-6 w-6 animate-spin' />
        </div>
      ) : data.image ? (
        <img
          src={data.image}
          alt='Post'
          className='max-h-[90vh] max-w-[90%] rounded-lg object-contain shadow-lg transition-transform duration-300 hover:scale-110'
        />
      ) : (
        <p className='text-white'>No image available</p>
      )}
    </div>
  )
}

export default ImagePreview
