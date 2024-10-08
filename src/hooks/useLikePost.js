import axios from "axios";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/token";
import { useCallback, useState } from "react";
import { BACKEND_API_URL } from '../constant';
import { usePostsStore } from "../store/usePostsStore";

export const useLikePost = () => {

    const { posts, setPosts } = usePostsStore();
    const [loading, setLoading] = useState(false);

    const handleLikePost = useCallback(async (postId) => {

        const post = posts.find((post) => post._id === postId);
        if (post.likedByUser) {
            toast.error("You have already liked this post.");
            return;
        }

        setPosts(
            posts.map((post) =>
                post._id === postId ? { ...post, likes: post.likes + 1, likedByUser: true } : post
            )
        );

        try {
            setLoading(true);
            const token = getToken();

            const response = await axios.post(
                `${BACKEND_API_URL}/likes/${postId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedPost = response.data.post;

            setPosts(
                posts.map((post) =>
                    post._id === postId ? { ...post, likes: updatedPost.likes, likedByUser: true } : post
                )
            );

            toast.success("Post liked successfully!");
        } catch (error) {
            console.error("Error liking post:", error);
            toast.error("Error liking post. Please try again.");

            setPosts(
                posts.map((post) =>
                    post._id === postId ? { ...post, likes: post.likes - 1, likedByUser: false } : post
                )
            );
        } finally {
            setLoading(false);
        }
    }, [posts, setPosts]);

    return { handleLikePost, loading };
};
