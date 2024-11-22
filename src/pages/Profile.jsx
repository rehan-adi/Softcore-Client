import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, X } from 'lucide-react';
import { getToken } from '../utils/token';
import { BsThreeDots } from "react-icons/bs";
import { BACKEND_API_URL } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import { useLikePost } from "../hooks/posts/useLikePost";
import { useProfileStore } from "../store/useProfileStore";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { FaArrowLeftLong, FaRegCommentDots } from "react-icons/fa6";
import { useProfilePostDelete } from "../hooks/useProfilePostDelete";
import { MdOutlineEdit, MdOutlineThumbUpOffAlt } from "react-icons/md";

function Profile() {

  const { profileData, posts, setPosts, loading } = useProfileStore();
  const { updateProfile } = useUpdateProfile();
  const { handleDelete, loading: isDeletingPost } = useProfilePostDelete();
  const { handleLikePost } = useLikePost();

  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    bio: "",
    image: "",
  });
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [editPostFormData, setEditPostFormData] = useState({
    content: "",
  });

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, controlNavbar]);

  useProfile();

  const handleEditProfile = () => {
    setEditFormData({
      username: profileData.username,
      bio: profileData.bio,
      profilePicture: profileData.profilePicture,
    });
    setIsEditModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setEditFormData((prevData) => ({
          ...prevData,
          profilePicture: file,
        }));
      } catch (error) {
        console.error("Error handling file:", error);
      }
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(editFormData);
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post._id === postId);
    setEditPostFormData({
      content: post.content,
    });
    setSelectedPost(postId);
    setIsEditPostModalOpen(true);
  };

  const handleEditPostFormChange = (e) => {
    setEditPostFormData({
      ...editPostFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditPostFormSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const data = { content: editPostFormData.content };
  
      const response = await axios.patch(
        `${BACKEND_API_URL}/posts/update/${selectedPost}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response Data:", response.data);
  
      setPosts((prevPosts) => {
        console.log("Previous posts:", prevPosts);
  
        const updatedPosts = prevPosts.map((post) =>
          post._id === selectedPost
            ? { ...post, content: response.data.data.post.content }
            : post
        );
  
        console.log("Updated posts:", updatedPosts);
  
        return updatedPosts;
      });
  
      setIsEditPostModalOpen(false);
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error("Failed to update post.");
    }
  };
  
  
  const handlePostDelete = async (postId) => {
    const success = await handleDelete(postId);
    if (success) {
      setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
      setSelectedPost(null);
      toast.success("Post deleted successfully!");
    } else {
      toast.error("Failed to delete post");
    }
  };


  const closeModel = () => {
    setSelectedPost(null);
  };


  const handleLike = async (postId) => {
    try {
      await handleLikePost(postId);
    } catch (error) {
      toast.error("Error liking the post");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex w-full md:ml-[300px] md:w-[45vw] flex-col lg:mt-12 mt-[70px] space-y-6 justify-center items-center">
      {/* Skeleton structure for the user profile */}
      <div className="py-6 md:w-[45vw] w-full animate-pulse">
        <div className="flex justify-between px-5 items-center mb-8">
          <div className="w-28 h-28 bg-gray-200 dark:bg-[#27272A] rounded-full"></div>
          <div className="rounded-full h-10 w-32 bg-gray-200 dark:bg-[#27272A]"></div>
        </div>
        <div className="mt-6 px-5">
          <div className="h-6 bg-gray-200 dark:bg-[#27272A] rounded w-36 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#27272A] rounded w-28 mb-4"></div>
        </div>
        <div className="mt-5 px-5">
          <div className="h-4 bg-gray-200 dark:bg-[#27272A] rounded w-64 mb-4"></div>
        </div>
        <div className="mt-5 flex gap-7 mb-10 px-5">
          <div className="h-4 bg-gray-200 dark:bg-[#27272A] rounded w-20"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#27272A] rounded w-20"></div>
        </div>
      </div>
      {/* Skeleton structure for posts */}
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="p-6 border-b md:mt-20 mt-32 border-white border-opacity-20 md:w-[45vw] w-full animate-pulse">
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
    );
  }

  const followersCount = profileData?.followers?.length || 0;
  const followingCount = profileData?.following?.length || 0;

  return (
    <div>
      <div className="w-full md:px-80 z-10 items-center bg-black text-white min-h-screen">
        {/*  Profile and Profile Posts */}
        {profileData ? (
          <div className="text-white">
            <nav
              className={`h-[70px] py-4 lg:px-10 px-3 items-center fixed top-0 z-40 border-b border-white w-full md:hidden flex gap-10 border-opacity-20 transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'
                }`}
              style={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(0, 0, 0, 0.5)', // Adjust transparency as needed
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Link to="/">
                <span>
                  <FaArrowLeftLong className="text-xl inline-block" />
                </span>
              </Link>
              <div className="">
                <p className="text-lg font-semibold">{profileData.fullname}</p>
                <p className="text-sm font-normal">{posts.length} posts</p>
              </div>
            </nav>
            <div className="lg:pt-20 pt-24">
              <div className="flex justify-between px-5 items-center">
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="w-28 h-28 rounded-full"
                />
                <button
                  onClick={handleEditProfile}
                  className="rounded-full border font-semibold border-white text-white py-2 px-5 border-opacity-40"
                >
                  Edit Profile
                </button>
              </div>
              <div className="mt-6 px-5">
                <p className="text-xl font-semibold">{profileData.fullname}</p>
                <p className="text-sm text-gray-400 font-normal">{profileData.username}</p>
              </div>
              <div className="mt-5 px-5">
                <p className="text-base lg:w-[31vw] w-[85vw] font-normal">{profileData.bio}</p>
              </div>
              <div className="mt-5 flex gap-7  mb-10 px-5">
              <Link to={`/profile/following`}>
                <p className="text-base font-bold">
                  {followingCount} <span className="opacity-60 font-normal">Following</span>
                </p>
                </Link>
                <p className="text-base font-bold">
                  {followersCount} <span className="opacity-60 font-normal">Followers</span>
                </p>
              </div>
              <div className="mt-2 pb-[58px] md:pb-0 w-full text-white">
                <h1 className="text-lg px-5 pt-4 font-semibold mb-5">Posts</h1>
                <div className='border border-white md:border-opacity-20 border-opacity-0 md:rounded-3xl rounded-none'>
                  {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                      <div
                        key={post._id}
                        className="border-b border-white border-opacity-20 px-5 py-4"
                      >
                        <div className="flex justify-between mb-4 items-start">
                          <div className="flex gap-3 items-center justify-start">
                            {post.author && post.author.profilePicture && (
                              <img
                                src={profileData.profilePicture}
                                alt={post.author.username}
                                className="w-8 h-8 rounded-full mr-1"
                              />
                            )}
                            <div className="flex items-start gap-4">
                              <div>
                                <p className="text-white font-semibold">{post.author?.username ?? "anonymous"}</p>
                                <p className="font-medium text-xs text-gray-200">{post.author?.fullname ?? "Unknown Author"}</p>
                              </div>
                              <p className="text-gray-400 mt-1 text-xs">
                                Posted {new Date(post.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              onClick={() => setSelectedPost(post._id === selectedPost ? null : post._id)}
                              className="font-semibold cursor-pointer"
                            >
                              <BsThreeDots className="text-2xl" />
                            </button>
                            {selectedPost === post._id && (
                              <div className="absolute right-0 top-0">
                                <div className="w-48 bg-black border border-white border-opacity-20 shadow-lg rounded-md z-10">
                                  <div className="py-4 flex flex-col px-1 justify-center items-center gap-2 relative">
                                    <button
                                      onClick={closeModel}
                                      className="absolute top-1 right-3 transition-colors"
                                    >
                                      <span className="text-white text-2xl">&times;</span>
                                    </button>
                                    <button
                                      onClick={() => handleEditPost(post._id)}
                                      className="w-[90%] px-4 py-3 mt-6 text-white bg-opacity-50 hover:bg-opacity-80 bg-[#27272A] rounded-lg justify-center text-left flex items-center transition-colors duration-150"
                                    >
                                      <MdOutlineEdit className="mr-3 text-2xl" />
                                      <span className="text-base font-medium">Edit Post</span>
                                    </button>
                                    <button
                                      onClick={() => handlePostDelete(post._id)}
                                      disabled={isDeletingPost}
                                      className="w-[90%] px-4 py-3 text-white bg-opacity-50 hover:bg-opacity-80 bg-[#27272A] rounded-lg text-left flex justify-center items-center transition-colors duration-150"
                                    >
                                      {isDeletingPost && selectedPost === post._id ? (
                                        <>
                                          <Loader2 className="text-xl animate-spin" />
                                        </>
                                      ) : (
                                        <>
                                          <RiDeleteBin6Line className="mr-2 text-xl" />
                                          <span className="text-base font-medium">Delete Post</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <Link to={`/post/image/${post._id}`}>
                          {post.image && (
                            <img
                              className="w-full h-60 md:h-80 object-cover border border-white border-opacity-15 rounded-xl mb-4"
                              src={post.image}
                              alt={post.title}
                            />
                          )}
                        </Link>
                        <p className="mt-2 ml-1.5 text-[#E7E9EA]">{post.content}</p>
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
                        <div className="flex justify-between mt-8 items-center">
                          <button
                            onClick={() => handleLike(post._id)}
                            className="font-semibold cursor-pointer"
                          >
                            <span className="flex text-white py-2 px-1 gap-2 items-center justify-center">
                              <span>
                                <MdOutlineThumbUpOffAlt className="inline-block text-xl md:text-2xl" />
                              </span>
                              <span className="text-sm md:text-base">{post.likes.length}</span>
                            </span>
                          </button>
                          <button className="font-semibold cursor-pointer"
                            onClick={() => navigate(`/comments/${post._id}`)}
                          >
                            <span className="text-white flex py-2 px-1 gap-2 items-center justify-center">
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
                    <p className="px-5 pt-5 pb-32">No posts available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen w-full flex flex-col px-5 justify-center items-center text-center space-y-5">
            <p className="text-lg font-semibold">You need to sign in to access your profile</p>
            <button
              className="px-5 py-2 bg-white font-semibold text-black rounded-lg"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </div>

        )}
      </div>

      {/* Edit profile  */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex lg:top-0 top-[-75px] items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-black border border-opacity-20 w-[90vw] lg:w-[35vw] h-[82vh] lg:h-[78vh] border-white p-6 rounded-lg">
            <div className="flex justify-between mb-5 lg:mb-6 items-center">
              <h2 className="lg:text-2xl text-xl font-semibold">Edit Profile</h2>
              <button
                type="button"
                onClick={handleCloseEditModal}
                className="bg-white text-black font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
              >
                <X />
              </button>
            </div>
            <form onSubmit={handleEditFormSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editFormData.username}
                  onChange={handleEditFormChange}
                  className="appearance-none border border-white border-opacity-20 bg-black rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editFormData.bio}
                  onChange={handleEditFormChange}
                  className="appearance-none border border-white border-opacity-20 rounded bg-black w-full py-3 px-3 text-white leading-tight focus:outline-none lg:h-24 h-28 focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="w-full border-2 border-dashed border-gray-500 p-4 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 16l3-3m0 0l3 3m-3-3v8m13-12a2 2 0 00-2-2h-3.5a2 2 0 01-1.41-.59l-1.5-1.5A2 2 0 0010 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2h-5.5"
                      ></path>
                    </svg>
                    <p className="text-gray-400">Click to browse files</p>
                  </div>
                </label>
              </div>
              <div className="flex mt-10 items-center justify-between">
                <button
                  type="submit"
                  className="text-white font-semibold text-sm py-3 px-5 rounded-full border border-white border-opacity-40 focus:outline-none focus:shadow-outline"
                >
                  {loading ? <>
                    <Loader2 className="w-5 h-5 animate-spin mr-3 inline-block" /> saving....
                  </> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Post model  */}
      {isEditPostModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-black border border-opacity-20 w-[90vw] lg:w-[35vw] h-[60vh] lg:h-[59vh] border-white p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold mb-10 lg:mb-6">Edit Post</h2>
              <button
                type="button"
                onClick={() => setIsEditPostModalOpen(false)}
              >
                < X />
              </button>
            </div>
            <form encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="7"
                  value={editPostFormData.content}
                  onChange={handleEditPostFormChange}
                  className="appearance-none border border-white border-opacity-20 rounded bg-black w-full py-3 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex mt-10 items-center justify-between">
                <button
                  type="button"
                  onClick={handleEditPostFormSubmit}
                  className="bg-white text-black font-bold py-2 px-5 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
