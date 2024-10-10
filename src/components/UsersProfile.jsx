import React from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { BACKEND_API_URL } from '../constant';
import { useGetUsersProfile } from '../hooks/useGetUsersProfile';

const UsersProfile = () => {
    const { userProfileData, loading } = useGetUsersProfile();
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollow = async () => {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/follow/${userProfileData.id}`);
            if (response.status === 200) {
                setIsFollowing(true);
                toast.success('You are now following this user!');
            }
        } catch (error) {
            console.error('Error following user:', error);
            toast.error('Could not follow user. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center bg-black items-center">
                <Loader className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    if (!userProfileData) {
        return (
            <div className="text-center text-gray-400">User not found</div>
        );
    }

    const followersCount = userProfileData?.followers?.length || 0;
    const followingCount = userProfileData?.following?.length || 0;

    return (
        <div className="w-full md:px-60 z-10 flex justify-center items-start bg-black text-white min-h-screen">
            <div className="flex justify-center items-center">
                <div className="lg:px-8 py-10 flex justify-center items-center flex-col px-5">
                    <div className="flex justify-between items-center">
                        <img
                            src={userProfileData.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full"
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-2xl font-semibold">{userProfileData.fullname}</p>
                        <p className="text-sm text-gray-400 mt-1 font-normal">{userProfileData.username}</p>
                    </div>
                    <div className="mt-7">
                        <p className="text-base lg:w-[31vw] w-[90vw] text-center font-normal">{userProfileData.bio}</p>
                    </div>
                    <div className="mt-5 flex gap-7">
                        <p className="text-base font-bold">
                            {followingCount} <span className="opacity-60 font-normal">Following</span>
                        </p>
                        <p className="text-base font-bold">
                            {followersCount} <span className="opacity-60 font-normal">Followers</span>
                        </p>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={handleFollow}
                            className={`px-4 py-2 text-black font-semibold bg-white rounded-full transition duration-200 ${isFollowing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isFollowing}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersProfile;
