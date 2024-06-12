import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";

function Post() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/blogs/allblogs"
        );
        const { data } = response.data;
        if (data && data.blogPost) {
          setBlogs(data.blogPost);
        } else {
          throw new Error("No blog posts found in response data");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const handleLike = async (postId) => {
    try {
      const token = getToken();
      console.log(token);
      const response = await axios.post(
        `http://localhost:3333/api/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedBlog = response.data.post;
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === postId ? { ...blog, likes: updatedBlog.likes } : blog
        )
      );
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDelete = async (postId) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    // if (!confirmDelete) return;

    try {
      const token = getToken();
      await axios.delete(`http://localhost:3333/api/blogs/delete/${postId}`, {
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

  const handleEdit = (postId) => {
    setSelectedBlog(postId);
  };

  const closeModel = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="flex relative z-10">
      <nav className="py-6 lg:px-10 px-3 bg-[#0A090F] z-50 fixed border-b border-r border-white w-full lg:w-[50vw] border-opacity-20">
        <h1 className="text-2xl font-semibold">Posts</h1>
      </nav>
      <div className="lg:w-[50vw] w-full border-r border-white border-opacity-20">
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <ClipLoader color="#ffffff" />
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="space-y-6 pt-32 lg:pb-9 pb-20 px-3 lg:px-12">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#0A090F] border-white border border-opacity-20 z-10 rounded-lg shadow-lg lg:w-[44vw] lg:p-6 p-5 relative"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                    {blog.author && blog.author.profilePicture && (
                      <img
                        src={blog.author.profilePicture}
                        alt={blog.author.username}
                        className="w-8 h-8 rounded-full mr-4"
                      />
                    )}
                    {blog.author && (
                      <p className="text-gray-700 font-semibold">
                        {blog.author.username}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setSelectedBlog(blog._id)}
                      className="text-gray-700 font-semibold cursor-pointer"
                    >
                      <BsThreeDots className="text-2xl" />
                    </button>
                    {selectedBlog === blog._id && (
                      <div className="absolute right-0 top-0">
                        <div className="w-56 pt-3 bg-[#0A090F] border border-white border-opacity-20 shadow-sm rounded-md shadow-white z-10 mt-2">
                          <div className="py-2 flex flex-col gap-1">
                            <button
                              onClick={closeModel}
                              className="absolute top-2 right-4"
                            >
                              <span className="text-gray-400 text-2xl hover:text-gray-700">
                                &times;
                              </span>
                            </button>
                            <button
                              onClick={() => handleEdit(blog._id)}
                              className="px-4 py-2 text-sm text-white w-full text-left flex items-center"
                            >
                              <MdOutlineEdit className="mr-2 text-2xl" /> Edit
                              Post
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="px-4 py-2 text-sm text-white w-full text-left flex items-center"
                            >
                              <RiDeleteBin6Line className="mr-2 text-xl" />{" "}
                              Delete Post
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
                <p className="mt-2 text-gray-400">{blog.content}</p>
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
                    <span className="text-gray-500 flex hover:text-[#1D9BF0] py-2 px-1 gap-2 items-center justify-center">
                      <span>
                        <MdOutlineThumbUpOffAlt className="inline-block text-2xl" />
                      </span>
                      <span className="mt-1">Like</span>
                    </span>
                  </button>
                  <button className="text-gray-700 font-semibold cursor-pointer">
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
    </div>
  );
}

export default Post;
