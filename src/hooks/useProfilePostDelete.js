import axios from "axios"
import { toast } from 'react-hot-toast';
import { getToken } from "../utils/token";
import { useCallback, useState } from "react";
import { BACKEND_API_URL } from "../constant";
import { useProfileStore } from "../store/useProfileStore";

export const useProfilePostDelete = () => {

    const { deletePost } = useProfileStore();
    const [loading, setLoading] = useState(false);

    const handleDelete = useCallback(async (postId) => {
        setLoading(true);
        try {
            const token = getToken();
            await axios.delete(`${BACKEND_API_URL}/blogs/delete/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            deletePost(postId);
            toast.success("Post deleted successfully!");
            return true;
        } catch (error) {
            console.error("Error deleting post");
            const message = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [deletePost]);

    return { handleDelete, loading };

}