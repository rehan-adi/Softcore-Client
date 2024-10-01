import axios from "axios";
import { toast } from "react-hot-toast";
import { getToken } from '../utils/token';
import { BACKEND_API_URL } from "../constant";
import { useCallback, useState } from "react";

export const useDeletePost = (setBlogs, setSelectedBlog) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async (postId) => {
    setIsDeleting(true);
    try {
      const token = getToken();
      await axios.delete(`${BACKEND_API_URL}/blogs/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== postId));
      setSelectedBlog(null);
      toast.success("Post deleted successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Error deleting post:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting post:", error.message);
        toast.error("Error deleting post. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  }, [setBlogs, setSelectedBlog]);

  return { handleDelete, isDeleting };
};
