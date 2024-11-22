import axios from "axios";
import { getToken } from "../utils/token";
import { BACKEND_API_URL } from "../constant";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Followers() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchUserFollowing = async () => {
            const token = getToken();

            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_API_URL}/user/following`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setFollowers(response.data.following);
                    console.log(response.data.following);
                }
            } catch (error) {
                console.error("Error fetching followers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserFollowing();
    }, []);

    const goToUserProfile = (id) => {
        navigate(`/profile/${id}`);
    };


    if (loading) {
        return (
          <div className="bg-black flex flex-col items-center justify-start lg:mt-10 mt-6 text-white w-full min-h-screen px-4">
            <h1 className="text-xl font-semibold mb-12">Followers</h1>
            <ul className="w-full md:px-[395px] space-y-4">
              {[1, 2, 3].map((_, index) => (
                <li
                  key={index}
                  className="flex items-center px-4 py-3 bg-[#27272A] rounded-lg animate-pulse"
                >
                   <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                  <div className="flex flex-col">
                    <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                </li>
              ))}
            </ul>
          </div>
        );
      }    

    return (
        <div className="bg-black flex flex-col items-center justify-start lg:mt-10 mt-6 text-white w-full min-h-screen px-4">
            <h1 className="text-xl font-semibold mb-12">
                Followers
            </h1>

            {Array.isArray(followers) && followers.length > 0 ? (
                <ul className="w-full md:px-[395px]">
                    {followers.map((follower) => (
                        <li
                            key={follower._id}
                            onClick={() => goToUserProfile(follower._id)}
                            className="px-4 py-3 bg-[#F9FAFB0D] rounded-lg cursor-pointer flex items-center w-full hover:bg-neutral-900"
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src={follower.profilePicture}
                                    alt={`${follower.username}'s profile picture`}
                                    className="w-8 h-8 rounded-full object-cover mr-4"
                                />

                                {/* User Info: Name, Username */}
                                <div className="flex flex-col">
                                    <span className="text-base font-semibold">{follower.fullname}</span>
                                    <span className="text-sm text-gray-300">@{follower.username}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-base text-gray-400">No followers found.</p>
            )}
        </div>
    );
}

export default Followers;
