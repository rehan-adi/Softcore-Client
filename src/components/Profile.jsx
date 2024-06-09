import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const response = await axios.get(`http://localhost:3333/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authorization
          },
        });

        console.log("Profile data response:", response.data);
        setProfileData(response.data.profile);
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
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
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

  return (
    <div className="w-full text-white py-6 px-6 h-screen">
      {profileData ? (
        <div className="text-white">
          <h2>User Profile</h2>
          <p>Name: {profileData.username}</p>
          <p>Bio: {profileData.bio}</p>
          {/* Render other profile data */}
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
}

export default Profile;
