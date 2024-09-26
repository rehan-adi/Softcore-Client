import axios from "axios";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/token";
import { useState, useCallback } from "react";
import { BACKEND_API_URL } from '../constant.prod'

export const useCreatePost = () => {
    const [loading, setLoading] = useState(false);

    const onSubmitForm = useCallback(async (data, onClose) => {
        const token = getToken('token');

        if (!token) {
            toast.error("Please login to create a post");
            onClose();
            return;
        }

        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("category", data.category);
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag); // Filter out empty tags
        tagsArray.forEach(tag => formData.append("tags[]", tag));

        if (data.image?.[0]) {
            formData.append("image", data.image[0]);
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_API_URL}/blogs/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                toast.success("Post created successfully!");
                onClose();
                return;
            }
        } catch (error) {
            console.error("Error creating post:", error); 
            toast.error(
                error.response?.data?.message ||
                "Error creating post. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []); 

    return {
        loading,
        onSubmitForm,
    };
};
