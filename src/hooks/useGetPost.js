import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_API_URL } from '../constant';
import { usePostsStore } from "../store/usePostsStore";
import { useState, useEffect, useCallback } from "react";

export const useGetPost = () => {

    const { loading, setLoading, posts, setPosts } = usePostsStore();
    const [error, setError] = useState(null);

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_API_URL}/posts/allpost`);
            if (response.status === 200) {
                setPosts(Array.isArray(response.data.data.blogPost) ? response.data.data.blogPost : []);
            }
        } catch (error) {~~
            console.error("Error fetching blogs:", error);
            setError(error.response?.data?.message || "Error fetching data");
            toast.error("Failed to fetch blog posts");
        } finally {
            setLoading(false);
        }
    }, [setPosts, setLoading]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return {
        loading,
        posts,
        error,
        fetchBlogs
    };
};
