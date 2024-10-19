import axios from "axios";
import { toast } from "react-hot-toast";
import { getToken } from "../../utils/token";
import { useCallback, useState } from "react";
import { BACKEND_API_URL } from '../../constant';
import { usePostsStore } from "../../store/usePostsStore";

export const useLikePost = () => {

    const { posts, setPosts } = usePostsStore();
    const [loading, setLoading] = useState(false);

    const handleLikePost = useCallback(async (postId) => {
        const post = posts.find((post) => post._id === postId);
        const hasLiked = post.likedByUser;

        setPosts(
            posts.map((post) =>
                post._id === postId
                    ? {
                        ...post,
                        likes: hasLiked ? post.likes - 1 : post.likes + 1,
                        likedByUser: !hasLiked,
                    }
                    : post
            )
        );

        try {
            setLoading(true);
            const token = getToken();
            await axios.post(
                `${BACKEND_API_URL}/likes/${postId}/toggle-like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        } catch (error) {
            console.error("Error liking/unliking post:", error);
            toast.error("Error updating like. Please try again.");

            setPosts(
                posts.map((post) =>
                    post._id === postId
                        ? {
                            ...post,
                            likes: hasLiked ? post.likes + 1 : post.likes - 1,
                            likedByUser: hasLiked,
                        }
                        : post
                )
            );
        } finally {
            setLoading(false);
        }
    }, [posts, setPosts]);

    return { handleLikePost, loading };
};
