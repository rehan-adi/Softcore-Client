import axios from 'axios';
import { toast } from "react-hot-toast";
import { getToken } from "../utils/token";
import { BACKEND_API_URL } from '../constant';
import { useState, useCallback, useEffect } from 'react';

export const useComment = (postId) => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const getComment = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_API_URL}/comments/${postId}`);

            if (response.status == 200) {
                setComments(response.data.comments);
            }

        } catch (error) {
            console.error("Error fetching post's comments:", error);
            const message = error.response?.data?.message || 'Error fetching comments';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        if (postId) {
            getComment();
        }
    }, [postId, getComment])

    return { getComment, loading, comments };

}