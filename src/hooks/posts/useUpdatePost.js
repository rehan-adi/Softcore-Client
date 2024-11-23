import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useGetPost } from './useGetPost';
import { getToken } from '../../utils/token';
import { BACKEND_API_URL } from '../../constant';
import { usePostsStore } from '../../store/usePostsStore';

export const useUpdatePost = () => {

    const { updatePost, loading, setLoading } = usePostsStore();
    const { fetchBlogs } = useGetPost();

    const handleUpdatePost = useCallback(async (postId, updatedData) => {

        setLoading(true);
        const token = getToken();

        let updatedBlog = null;

        try {
            const response = await axios.patch(
                `${BACKEND_API_URL}/posts/update/${postId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                updatedBlog = response.data.updatedBlog;
                updatePost(postId, updatedBlog);
                toast.success("Post updated successfully!");

                await fetchBlogs();
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                const message = error.response.data.message || "You are not authorized to update this post.";
                toast.error(message);
            } else {
                toast.error("Failed to update post. Please try again.");
            }
        } finally {
            setLoading(false);
        }
        return updatedBlog;
    }, [updatePost, setLoading]);

    return { handleUpdatePost, loading };
};
