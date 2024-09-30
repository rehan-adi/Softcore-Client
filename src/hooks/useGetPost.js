import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_API_URL } from '../constant.prod';
import { useState, useEffect, useCallback } from "react";

export const useGetPost = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null); 

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_API_URL}/blogs/allblogs`);
            if(response.status === 200) {
                setPosts(response.data.data.blogPost);
                toast.success("Blog posts fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError(error.response?.data?.message || "Error fetching data");
            toast.error("Failed to fetch blog posts");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return {
        loading,
        posts,
        error
    };
};
