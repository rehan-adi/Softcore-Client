import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_API_URL } from '../constant.prod';
import { useState, useEffect, useCallback } from "react";

export const useGetPost = () => {
    const [loading, setLoading] = useState(false);
    const [blogPost, setBlogPost] = useState([]);
    const [error, setError] = useState(null); 

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_API_URL}/blogs/allblogs`);
            const { data } = response.data;
            if (data && data.blogPost) {
                setBlogPost(data.blogPost);
                toast.success("Blog posts fetched successfully");
            } else {
                throw new Error("No blog posts found in response data");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError("Error fetching data");
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
        blogPost,
        error
    };
};
