import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    bio: "",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not available");
          setLoading(false);
          return;
        }

        // Decode the token to get user ID
        const userId = getUserIdFromToken(token);

        if (!userId) {
          console.error("User ID not available in token");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:3333/api/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Profile data response:", response.data);
        setProfileData(response.data.profile);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Function to extract user ID from token
  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

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
    try {
      const token = localStorage.getItem("token");
      const id = getUserIdFromToken(token);

      const formData = new FormData();
      formData.append("username", editFormData.username);
      formData.append("bio", editFormData.bio);
      formData.append("profilePicture", editFormData.profilePicture); 
      
      const response = await axios.patch(
        `http://localhost:3333/api/profile/${id}`,
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
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setEditFormData((prevData) => ({
          ...prevData,
          profilePicture: file, // Set the file directly, not in a nested object
        }));
      } catch (error) {
        console.error("Error handling file:", error);
      }
    }
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };


  const handleDelete = async (postId) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:3333/api/blogs/delete/${postId}`, {
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
    // setShowModal(false);
    setSelectedPost(null);
  };
    

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ClipLoader color="#ffffff" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const followersCount = profileData.followers ? profileData.followers.length : 0;
  const followingCount = profileData.following ? profileData.following.length : 0;

  return (
    <div>
      <div className="w-[50vw] z-10 border-r border-white border-opacity-20 pb-3 text-white min-h-screen">
        {profileData ? (
          <div className="text-white">
            <nav className="h-[81px] py-4 lg:px-10 px-3 items-center bg-[#0A090F] z-40 fixed top-0 border-b border-r border-white w-full flex gap-10 lg:w-[50vw] border-opacity-20">
              <Link to="/">
                <span>
                  <FaArrowLeftLong className="text-xl inline-block" />
                </span>
              </Link>
              <div className="">
                <p className="text-xl font-semibold">{profileData.fullname}</p>
                <p className="text-sm font-normal">{posts.length} posts</p>
              </div>
            </nav>
            <div className="pt-28 px-8">
              <div className="flex justify-between items-center">
                <img
                  src={profileData.profilePicture || 'default-profile.png'}
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
                <p className="text-sm opacity-50 font-normal">{profileData.username}</p>
              </div>
              <div className="mt-5">
                <p className="text-base w-[31vw] font-normal">{profileData.bio}</p>
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
                        className="bg-[#0A090F] border border-white border-opacity-20 p-4 rounded-lg mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3 items-center justify-start">
                            {post.author && post.author.profilePicture && (
                              <img
                                src={post.author.profilePicture}
                                alt={post.author.username}
                                className="w-8 h-8 rounded-full mr-1"
                              />
                            )}
                            <p className="font-bold">{post.author.fullname}</p>
                            <p className="opacity-40">{post.author.username}</p>
                          </div>
                          <div className="relative">
                            <button
                              onClick={() => setSelectedPost(post._id === selectedPost ? null : post._id)}
                              className="text-gray-700 font-semibold cursor-pointer"
                            >
                              <BsThreeDots className="text-2xl" />
                            </button>
                            {selectedPost === post._id && (
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
                              onClick={() => handleEdit(post._id)}
                              className="px-4 py-2 text-sm text-white w-full text-left flex items-center"
                            >
                              <MdOutlineEdit className="mr-2 text-2xl" /> Edit
                              Post
                            </button>
                            <button
                              onClick={() => handleDelete(post._id)}
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
                        <h2 className="text-lg mt-4 font-semibold">{post.title}</h2>
                        <p className="text-base mt-5">{post.content}</p>
                        <img src={post.image} alt={post.title} className="mt-2 rounded" />
                        {/* {post.image && (
                        )} */}
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
          <p>No profile data available</p>
        )}
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-[#0A090F] border border-opacity-20 w-[35vw] h-[66vh] border-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Edit Profile</h2>
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
                  className="appearance-none border border-white border-opacity-20 bg-[#0A090F] rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="appearance-none border border-white border-opacity-20 rounded bg-[#0A090F] w-full py-3 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="profilePicture">
                  Profile Picture URL
                </label>
                <input
                   type="file"
                   id="profilePicture"
                   name="profilePicture"
                   onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex mt-10 items-center justify-between">
                <button
                  type="submit"
                  className="text-white font-bold py-3 px-5 rounded-full border border-white border-opacity-40 focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="bg-white text-black font-bold py-3 px-5 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Cancel
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
