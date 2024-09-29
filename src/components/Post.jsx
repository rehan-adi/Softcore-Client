import axios from "axios";
import { useState } from "react";
import { X } from 'lucide-react'
import { LuSend } from "react-icons/lu";
import { toast } from "react-hot-toast";
import { getToken } from '../utils/token';
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { useGetPost } from "../hooks/useGetPost";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";

function Post() {

  const { loading, blogPost, error } = useGetPost();

  const [blogs, setBlogs] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentFormData, setCommentFormData] = useState({ content: "" });
  const [comments, setComments] = useState([]);


  const handleLike = async (postId) => {
    try {
      const token = getToken();
      if (likedPosts.includes(postId)) {
        toast.error("You have already liked this post.");
        return;
      }
      const response = await axios.post(
        `http://localhost:3333/api/v1/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedBlog = response.data.post;
      // Update blogs with new like count
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === postId ? { ...blog, likes: updatedBlog.likes } : blog
        )
      );
      // Update likedPosts state
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
      toast.success("Post liked successfully!");
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Error liking post. Please try again.");
    }
  };


  const handleDelete = async (postId) => {

    try {
      const token = getToken();
      await axios.delete(`http://localhost:3333/api/v1/blogs/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== postId));
      setSelectedBlog(null);
      toast.success("Post deleted successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Error deleting post:", error.response.data.message);
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.error(
          "Error deleting post: No response received",
          error.request
        );
        toast.error("Error deleting post. Please try again.");
      } else {
        console.error("Error deleting post:", error.message);
        toast.error("Error deleting post. Please try again.");
      }
    }
  };

  const handleEdit = (blog) => {
    setEditFormData({
      content: blog.content,
    });
    setSelectedBlog(blog);
    setShowModal(true);
  };


  const closeModel = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const postId = selectedBlog._id;
      const response = await axios.patch(
        `http://localhost:3333/api/v1/blogs/update/${postId}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedBlog = response.data.updatedBlog;
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === postId ? { ...blog, ...updatedBlog } : blog
        )
      );
      setShowModal(false);
      toast.success("Post updated successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        toast.error("An error occurred. Please try again later.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };


  const toggleCommentModal = () => {
    setShowCommentModal(!showCommentModal);
    if (!showCommentModal && selectedBlog && selectedBlog._id) {
      fetchComments(selectedBlog._id);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3333/api/comments/${postId}`);
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
    try {
      const postId = selectedBlog._id;
      console.log(postId);
      const response = await axios.post(
        `http://localhost:3333/api/v1/comments/post/${postId}/comments`,
        commentFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newComment = response.data.comment;
      setComments([...comments, newComment]);
      setCommentFormData({ content: "" });
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    }
  };

  return (
    <div className="flex relative z-10">
      <div className="w-full flex justify-center items-center min-h-screen">
        {loading ? (
          <div className="min-h-screen flex w-full flex-col mt-20 space-y-6 justify-center items-center">
            {[1, 2].map((_, i) => (
              <div key={i} className="p-6 border border-white border-opacity-25 md:w-[45vw] w-[90%] rounded-lg space-y-6 animate-pulse">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-[#27272A] rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-200 dark:bg-[#27272A] rounded w-24 mb-1"></div>
                      <div className="h-4 bg-gray-200 dark:bg-[#27272A] rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-[#27272A] rounded w-20"></div>
                </div>
                <div className="h-36 bg-gray-200 dark:bg-[#27272A] rounded mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-[#27272A] rounded mb-2"></div>
                <div className="mt-4 space-x-2">
                  <div className="inline-block h-4 bg-gray-200 dark:bg-[#27272A] rounded w-16"></div>
                  <div className="inline-block h-4 bg-gray-200 dark:bg-[#27272A] rounded w-16"></div>
                </div>
                <div className="mt-6 h-4 bg-gray-200 dark:bg-[#27272A] rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="space-y-6 pt-20 lg:pb-9 pb-20 px-3 lg:px-12">
            {blogPost.map((blog) => (
              <div
                key={blog._id}
                className="bg-black border-white border border-opacity-25 rounded-lg md:w-[45vw] lg:p-6 p-5 relative"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-3 items-center">
                    {blog.author && blog.author.profilePicture ? (
                      <img
                        src={blog.author.profilePicture}
                        alt={blog.author.username}
                        className="w-8 h-8 rounded-full mr-1"
                      />
                    ) : (
                      <img
                        src={`http://localhost:3333/${blog.author.profilePicture}`}
                        alt={blog.author.username}
                        className="w-8 h-8 rounded-full mr-1"
                      />
                    )}
                    <div>
                      {blog.author && (
                        <p className="font-bold text-white">
                          {blog.author.fullname}
                        </p>
                      )}
                      {blog.author && (
                        <p className="text-gray-300 text-sm font-semibold">
                          {blog.author.username}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="text-white font-semibold cursor-pointer"
                    >
                      <BsThreeDots className="text-2xl" />
                    </button>
                    {selectedBlog && selectedBlog._id === blog._id && (
                      <div className="absolute right-0 top-0">
                        <div className="w-56 bg-black border border-white border-opacity-20 shadow-lg rounded-md z-10">
                          <div className="py-3 flex flex-col justify-center items-center gap-2 relative">
                            <button
                              onClick={closeModel}
                              className="absolute top-0 right-3 transition-colors"
                            >
                              <span className="text-white text-2xl">&times;</span>
                            </button>
                            <button
                              onClick={() => handleEdit(blog)}
                              className="w-[90%] px-4 py-3 mt-5 text-white bg-opacity-50 hover:bg-opacity-80 bg-[#27272A] rounded-lg text-left flex items-center transition-colors duration-150"
                            >
                              <MdOutlineEdit className="mr-2 text-2xl" />
                              <span className="text-base font-medium">Edit Post</span>
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="w-[90%] px-4 py-3 text-white bg-opacity-50 hover:bg-opacity-80 bg-[#27272A] rounded-lg text-left flex items-center transition-colors duration-150"
                            >
                              <RiDeleteBin6Line className="mr-2 text-xl" />
                              <span className="text-base font-medium">Delete Post</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
                {blog.image && (
                  <img
                    className="w-full h-48 border border-white border-opacity-20 object-cover rounded-lg mb-4"
                    src={`http://localhost:3333/${blog.image}`}
                    alt={blog.title}
                  />
                )}
                <h2 className="mt-4 text-xl font-semibold">{blog.title}</h2>
                <p className="mt-2 text-[#E7E9EA]">{blog.content}</p>
                <div className="mt-7">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block text-[#1D9BF0] text-base font-bold mr-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={() => handleLike(blog._id)}
                    className="text-gray-700 font-semibold cursor-pointer"
                  >
                    <span className="flex text-gray-500 hover:text-[#1D9BF0] py-2 px-1 gap-2 items-center justify-center">
                      <span>
                        <MdOutlineThumbUpOffAlt className="inline-block text-2xl" />
                      </span>
                      <span>{blog.likes.length}</span>
                    </span>
                  </button>
                  <button className="text-gray-700 font-semibold cursor-pointer"
                    onClick={toggleCommentModal}
                  >
                    <span className="text-gray-500 flex hover:text-[#1D9BF0] py-2 px-1 gap-2 items-center justify-center">
                      <span>
                        <FaRegCommentDots className="inline-block text-2xl" />
                      </span>
                      <span>Comment</span>
                    </span>
                  </button>
                  <button className="text-gray-700 font-semibold cursor-pointer">
                    <span className="text-gray-500 flex hover:text-[#1D9BF0] py-2 px-1 gap-2 items-center justify-center">
                      <span>
                        <LuSend className="inline-block text-2xl" />
                      </span>
                      <span>Send</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-black border border-opacity-20 lg:w-[35vw] w-[90vw] h-[60vh] lg:h-[58vh] border-white p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold mb-8 lg:mb-4">Edit Post</h2>
              <button
                type="button"
                onClick={closeModel}
              >
                < X />
              </button>
            </div>
            <form onSubmit={handleEditFormSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="bio">
                  Content
                </label>
                <textarea
                  id="bio"
                  name="content"
                  rows='8'
                  value={editFormData.content}
                  onChange={handleEditFormChange}
                  className="appearance-none border border-white border-opacity-20 rounded bg-black w-full py-3 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex lg:mt-10 mt-8 items-center justify-between">
                <button
                  type="submit"
                  className="bg-white text-black font-bold py-2 px-5 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-[#0A090F] border border-opacity-20 lg:w-[35vw] w-[90vw] h-[40vh] lg:h-[50vh] border-white p-6 rounded-lg">
            <h2 className="text-2xl mb-8 lg:mb-4">Comments</h2>
            <div className="overflow-y-auto max-h-[50vh]">
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
                className="appearance-none border border-white border-opacity-20 rounded bg-[#0A090F] w-full py-3 px-3 text-white leading-tight focus:outline-none h-44 focus:shadow-outline"
                placeholder="Write a comment..."
              />
              <div className="flex items-center mt-7 justify-start">
                <button
                  type="submit"
                  className="text-white font-bold py-2 px-4 rounded-full border border-white border-opacity-40 focus:outline-none focus:shadow-outline"
                >
                  Comment
                </button>
                <button
                  type="button"
                  onClick={toggleCommentModal}
                  className="bg-white text-black font-bold py-2 px-4 rounded-full ml-4 focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Post;
