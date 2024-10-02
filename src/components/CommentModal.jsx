import React from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { toast } from "react-hot-toast";
import { getToken } from '../utils/token';

const CommentModal = ({
    showCommentModal,
    toggleCommentModal,
    selectedBlog,
    comments,
    setComments,
    commentFormData,
    setCommentFormData,
}) => {

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`${BACKEND_API_URL}/comments/${postId}`);
            const { data } = response.data;
            if (data && data.comments) {
                setComments(data.comments);
            } else {
                throw new Error("No comments found in response data");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error("Error fetching comments.");
        }
    };

    const handleCommentChange = (e) => {
        setCommentFormData({
            ...commentFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!selectedBlog || !selectedBlog._id) {
            toast.error("Unable to submit comment. Please try again.");
            return;
        }
        
        try {
            const postId = selectedBlog._id;
            const response = await axios.post(
                `${BACKEND_API_URL}/comments/post/${postId}/comments`,
                commentFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const newComment = response.data.comment;
            setComments((prevComments) => [...prevComments, newComment]);
            setCommentFormData({ content: "" });
            toast.success("Comment added successfully!");
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Error adding comment. Please try again.");
        }
    };

    React.useEffect(() => {
        if (showCommentModal && selectedBlog && selectedBlog._id) {
            fetchComments(selectedBlog._id);
        }
    }, [showCommentModal, selectedBlog]);

    return (
        <>
            {showCommentModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
                    <div className="bg-black border border-opacity-20 lg:w-[35vw] w-[90vw] h-[55vh] border-white p-6 rounded-lg">
                        <div className="flex justify-between mb-5 items-center">
                            <h2 className="text-xl font-semibold">Comments</h2>
                            <button
                                type="button"
                                onClick={toggleCommentModal}
                                className="text-white py-2 px-4 rounded-full ml-4 focus:outline-none focus:shadow-outline"
                            >
                                <X />
                            </button>
                        </div>
                        <div className="overflow-y-auto bg-red-500 max-h-[50vh]">
                            {comments.map((comment, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-white">{comment.content}</p>
                                    <p className="text-gray-400">{comment.author}</p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                id="comment"
                                name="content"
                                value={commentFormData.content}
                                onChange={handleCommentChange}
                                className="appearance-none border border-white border-opacity-20 rounded bg-black w-full py-3 px-3 text-white placeholder:text-white leading-tight focus:outline-none h-44 focus:shadow-outline"
                                placeholder="Write a comment..."
                            />
                            <div className="flex items-center mt-7 justify-start">
                                <button
                                    type="submit"
                                    className="text-black bg-white font-bold py-2 px-4 rounded-full"
                                >
                                    Comment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentModal;
