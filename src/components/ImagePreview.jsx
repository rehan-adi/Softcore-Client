import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import { toast } from "react-hot-toast";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_API_URL } from '../constant';
import { useNavigate } from 'react-router-dom';

const ImagePreview = () => {

  const { postId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_API_URL}/posts/post/${postId}`)
        if (response.status === 200) {
          setData(response.data.data.posts);
        }
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(message);
        console.error("Error while getting Post detail's", error);
      } finally {
        setLoading(false)
      }
    }
    getPostDetails();
  }, [postId])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
      <div className="absolute top-4 left-6 flex space-x-3">
        <button
          onClick={() => navigate(-1)}
          className="text-white rounded-full p-2 bg-neutral-800 hover:bg-neutral-700 transition hover:scale-105 hover:rotate-90"
        >
          <X />
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 animate-spin mr-3 inline-block" />
        </div>
      ) : (
        data.image ? (
          <img
            src={data.image}
            alt="Post"
            className="object-contain max-h-[90vh] max-w-[90%] rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <p className="text-white">No image available</p>
        )
      )}
    </div>
  )
}

export default ImagePreview