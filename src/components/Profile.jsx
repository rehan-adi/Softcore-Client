import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

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
    <div className="w-[50vw] z-10 border-r border-white border-opacity-20 text-white min-h-screen">
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
              <p className="text-sm font-normal">
                {posts.length} posts
              </p>
            </div>
          </nav>
          <div className="pt-28 px-6">
            <div className="flex justify-between items-center">
              <img
                src={profileData.profilePicture || 'default-profile.png'}
                alt="Profile"
                className="w-28 h-28 rounded-full"
              />
              <button className="rounded-full border font-semibold border-white text-white py-2 px-5 border-opacity-40">Edit Profile</button>
            </div>
            <div className="mt-6">
              <p className="text-xl font-semibold">{profileData.fullname}</p>
              <p className="text-sm opacity-50 font-normal">{profileData.username}</p>
            </div>
            <div className="mt-5">
              <p className="text-base font-normal">{profileData.bio}</p>
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
                    <div key={post._id} className="bg-[#0A090F] border border-white border-opacity-20 p-4 rounded-lg mb-4">
                      <h2 className="text-lg font-semibold">{post.title}</h2>
                      <p className="text-base mt-5">{post.content}</p>
                      {post.image && <img src={post.image} alt={post.title} className="mt-2 rounded" />}
                      <p className="text-base text text-[#1D9BF0] mt-6">{post.tags.join(' ')}</p>
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
  </div>
  );
}

export default Profile;
