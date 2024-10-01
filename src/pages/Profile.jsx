import axios from "axios";
import { Loader, X } from 'lucide-react'
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BACKEND_API_URL } from '../constant';
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getToken, getUserIdFromToken } from '../utils/token';

function Profile() {

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    bio: "",
    image: "",
  });
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [editPostFormData, setEditPostFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const token = getToken("token");
        if (!token) {
          toast.error("Token not available. Please log in again.");
          setLoading(false);
          return;
        }

        // Decode the token to get user ID
        const userId = getUserIdFromToken(token);

        if (!userId) {
          toast.error("User ID not found in token. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${BACKEND_API_URL}/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setProfileData(response.data.profile);
        setPosts(response.data.posts);
        toast.success("Profile data fetched successfully!");
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Error fetching profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);


  const handleEditProfile = () => {
    setEditFormData({
      username: profileData.username,
      bio: profileData.bio,
      profilePicture: profileData.profilePicture,
    });
    setIsEditModalOpen(true);
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
    setLoading(true)
    try {
      const token = getToken("token");
      const id = getUserIdFromToken(token);

      const formData = new FormData();
      formData.append("username", editFormData.username);
      formData.append("bio", editFormData.bio);
      formData.append("image", editFormData.profilePicture);

      const response = await axios.patch(
        `${BACKEND_API_URL}/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileData(response.data.profile);
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message ||
        "Error updating profile. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

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

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post._id === postId);
    setEditPostFormData({
      title: post.title,
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
      const formData = new FormData();
      formData.append("content", editPostFormData.content);

      const response = await axios.patch(
        `${BACKEND_API_URL}/blogs/update/${selectedPost}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the post data after editing
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === selectedPost ? { ...post, ...response.data.updatedPost } : post
        )
      );

      setIsEditPostModalOpen(false);
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };


  const handleDelete = async (postId) => {
    try {
      const token = getToken();
      await axios.delete(`${BACKEND_API_URL}/blogs/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
      setSelectedPost(null);
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

  const closeModel = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center bg-black items-center">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const followersCount = profileData?.followers?.length || 0;
  const followingCount = profileData?.following?.length || 0;

  return (
    <div>
      <div className="w-full md:px-60 z-10 lg:pb-3 pb-28 items-center bg-black text-white min-h-screen">
        {/*  Profile and Profile Posts */}
        {profileData ? (
          <div className="text-white">
            <nav className="h-[70px] py-4 lg:px-10 px-3 items-center bg-black z-40 fixed top-0 border-b border-r border-white w-full md:hidden flex gap-10 border-opacity-20">
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
            <div className="lg:pt-20 pt-24 lg:px-8 px-5">
              <div className="flex justify-between items-center">
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
              <div className="mt-6">
                <p className="text-xl font-semibold">{profileData.fullname}</p>
                <p className="text-sm text-gray-400 font-normal">{profileData.username}</p>
              </div>
              <div className="mt-5">
                <p className="text-base lg:w-[31vw] w-[85vw] font-normal">{profileData.bio}</p>
              </div>
              <div className="mt-5 flex gap-7">
                <p className="text-base font-normal">
                  {followingCount} <span className="opacity-40">Following</span>
                </p>
                <p className="text-base font-normal">
                  {followersCount} <span className="opacity-40">Followers</span>
                </p>
              </div>
              <div className="mt-10">
                <h1 className="text-xl font-semibold mb-5">Posts</h1>
                <div>
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div
                        key={post._id}
                        className="bg-black border border-white border-opacity-25 p-4 rounded-lg mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3 items-center justify-start">
                            {post.author && post.author.profilePicture && (
                              <img
                                src={profileData.profilePicture}
                                alt={post.author.username}
                                className="w-8 h-8 rounded-full mr-1"
                              />
                            )}
                            <div>
                              <p className="font-bold">{post.author.fullname}</p>
                              <p className="text-gray-300 text-sm">{post.author.username}</p>
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
                                <div className="w-56 bg-black border border-white border-opacity-20 shadow-lg rounded-md z-10">
                                  <div className="py-3 flex flex-col justify-center items-center gap-2 relative">
                                    <button
                                      onClick={closeModel}
                                      className="absolute top-0 right-3 transition-colors"
                                    >
                                      <span className="text-white text-2xl">&times;</span>
                                    </button>
                                    <button
                                      onClick={() => handleEditPost(post._id)}
                                      className="w-[90%] px-4 py-3 mt-5 text-white bg-opacity-50 hover:bg-opacity-80 bg-[#27272A] rounded-lg text-left flex items-center transition-colors duration-150"
                                    >
                                      <MdOutlineEdit className="mr-2 text-2xl" />
                                      <span className="text-base font-medium">Edit Post</span>
                                    </button>
                                    <button
                                      onClick={() => handleDelete(post._id)}
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
                        <h2 className="text-lg mt-4 font-semibold">{post.title}</h2>
                        <p className="text-base mt-5">{post.content}</p>
                        {post.image && (
                          <img src={post.image} alt={post.title} className="mt-2 p-5 rounded" />
                        )}
                        <p className="text-base text text-[#1D9BF0] mt-6">
                          {post.tags.join(' ')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No posts available</p>
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
              onClick={() =>  navigate('/signin')}
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
                    <Loader className="w-5 h-5 animate-spin mr-3 inline-block" /> saving....
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
