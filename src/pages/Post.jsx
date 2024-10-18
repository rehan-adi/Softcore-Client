import { useState } from "react";
import { toast } from "react-hot-toast";
import { X, Loader } from 'lucide-react';
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import { useGetPost } from "../hooks/useGetPost";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLikePost } from "../hooks/useLikePost";
import { FaRegCommentDots } from "react-icons/fa6";
import { useDeletePost } from "../hooks/usePostDelete";
import { useUpdatePost } from '../hooks/useUpdatePost';
import { usePostsStore } from "../store/usePostsStore";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";

function Post() {
  const navigate = useNavigate();

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({ content: "" });

  // Hooks for fetching posts and managing likes, updates, and deletions
  const { loading, error } = useGetPost();
  const { setPosts, posts } = usePostsStore();
  const { handleUpdatePost, loading: isUpdatingPost } = useUpdatePost();
  const { handleDelete, isDeleting } = useDeletePost(setSelectedBlog);
  const { handleLikePost } = useLikePost();


  // Handling post edit form submission
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const postId = selectedBlog._id;
      const updatedPost = await handleUpdatePost(postId, {
        content: editFormData.content,
      });

      if (updatedPost) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, content: updatedPost.content } : post
          )
        );
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating the post");
    }
  };

const handleLike = async (postId) => {
  try {
    await handleLikePost(postId);
  } catch (error) {
    toast.error("Error liking the post");
  }
};

  // Handle editing, opening the edit modal
  const handleEdit = (blog) => {
    setEditFormData({
      content: blog.content,
    });
    setSelectedBlog(blog);
    setShowModal(true);
  };

  // Closing the modal 
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  // Handle changes in the edit form
  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="flex relative z-10">
      <TopNavbar />
      <div className="w-full flex justify-center items-center min-h-screen">
        {loading ? (
          <div className="min-h-screen flex w-full flex-col lg:mt-8 mt-24 space-y-6 justify-center items-center">
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
                <div className="mt-6 h-4 bg-gray-200 dark:bg-[#27272A] rounded w-44"></div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="inline-block h-4 bg-gray-200 dark:bg-[#27272A] rounded w-16"></div>
                  <div className="inline-block h-4 bg-gray-200 dark:bg-[#27272A] rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="space-y-6 pt-24 lg:pt-8 lg:pb-9 pb-20 px-3 lg:px-12">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-black border-white border border-opacity-25 rounded-lg md:w-[45vw] lg:p-6 p-5 relative"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-3 items-center">
                      {post.author?.profilePicture ? (
                        <img
                          src={post.author.profilePicture}
                          alt={post.author.username}
                          className="w-8 h-8 rounded-full mr-1"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                      )}
                      <div className="flex items-start gap-5">
                        <div>
                          <p className="font-bold text-white">{post.author?.fullname ?? "Unknown Author"}</p>
                          <p className="text-gray-300 text-xs font-semibold">{post.author?.username ?? "anonymous"}</p>
                        </div>
                        <p className="text-gray-400 mt-1.5 text-xs">
                          Posted on {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setSelectedBlog(post)}
                        className="text-white font-semibold cursor-pointer"
                      >
                        <BsThreeDots className="text-2xl" />
                      </button>
                      {selectedBlog && selectedBlog._id === post._id && (
                        <div className="absolute right-0 top-0">
                          <div className="w-48 bg-black border border-white border-opacity-20 shadow-lg rounded-md z-10">
                            <div className="py-4 px-1 flex flex-col justify-center items-center gap-2 relative">
                              <button
                                onClick={handleCloseModal}
                                className="absolute top-0 right-3 transition-colors"
                              >
                                <span className="text-white text-2xl">&times;</span>
                              </button>
                              <button
                                onClick={() => handleEdit(post)}
                                className="w-[90%] px-4 py-3 mt-6 text-white bg-opacity-50 hover:bg-opacity-80 bg-[#27272A] rounded-lg text-left flex items-center justify-center transition-colors duration-150"
                              >
                                <MdOutlineEdit className="mr-3 text-2xl" />
                                <span className="text-base font-medium">Edit Post</span>
                              </button>
                              <button
                                onClick={() => handleDelete(post._id)}
                                disabled={isDeleting}
                                className={`w-[90%] px-4 py-3 text-white bg-opacity-50 hover:bg-opacity-80 bg-[#27272A] rounded-lg text-left flex items-center justify-center transition-colors duration-150 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                {isDeleting ? (
                                  <Loader className="mr-3 animate-spin w-5 h-5" />
                                ) : (
                                  <RiDeleteBin6Line className="mr-3 text-xl" />
                                )}
                                <span className="text-base font-medium">
                                  {isDeleting ? "" : "Delete Post"}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {post.image && (
                    <img
                      className="w-full h-60 border border-white border-opacity-20 object-cover rounded-lg mb-4"
                      src={post.image}
                      alt={post.title}
                    />
                  )}
                  <p className="mt-2 text-[#E7E9EA]">{post.content}</p>
                  <div className="mt-7">
                    {post.tags.map((tag, index) => (
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
                      onClick={() => handleLike(post._id)}
                      className={`font-semibold cursor-pointer flex items-center gap-2 ${post.likedByUser ? 'text-[#1D9BF0]' : 'text-gray-700'}`}
                    >
                      <span className={`flex py-2 px-1 gap-2 items-center justify-center ${post.likedByUser ? 'text-[#1D9BF0]' : 'text-gray-500'}`}>
                        <MdOutlineThumbUpOffAlt className={`inline-block text-xl md:text-2xl ${post.likedByUser ? 'text-[#1D9BF0]' : 'text-gray-500'}`} />
                        <span className="text-sm md:text-base">{post.likes.length}</span>
                      </span>
                    </button>
                    <button className="text-gray-700 font-semibold cursor-pointer"
                      onClick={() => navigate(`/comments/${post._id}`)}
                    >
                      <span className="text-gray-500 flex hover:text-[#1D9BF0] py-2 px-1 gap-2 items-center justify-center">
                        <span>
                          <FaRegCommentDots className="inline-block text-xl md:text-2xl" />
                        </span>
                        <span className="text-sm md:text-base">Comment</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No posts available.</div>
            )}
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
                onClick={handleCloseModal}
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
                  disabled={isUpdatingPost}
                  className="bg-white text-black font-bold py-2 px-5 w-36 rounded-full focus:outline-none focus:shadow-outline"
                >
                  {isUpdatingPost ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin mr-3 inline-block" />
                    </>
                  ) : (
                    "Update Post"
                  )}
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