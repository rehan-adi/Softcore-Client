import { Loader } from 'lucide-react';
import { FaRegCommentDots } from 'react-icons/fa6';
import useFollowUser from '../hooks/useFollowUser';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineThumbUpOffAlt } from 'react-icons/md';
import { useGetUsersProfile } from '../hooks/useGetUsersProfile';

const UsersProfile = () => {
    const navigate = useNavigate();

    const { userProfileData, userProfilePost, loading } = useGetUsersProfile();

    const userId = userProfileData?._id;
    const { isFollowing, followUser, loading: followLoading } = useFollowUser(userId);

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
        <div className="w-full md:px-80 z-10 flex justify-center items-start bg-black text-white min-h-screen">
            <div className="flex justify-center items-center">
                <div className="lg:px-8 pt-10 flex justify-center items-center flex-col">
                    <div className="flex justify-between items-center">
                        <img
                            src={userProfileData.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full"
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-2xl font-semibold">{userProfileData.fullname}</p>
                        <p className="text-base text-gray-400 mt-1 font-normal">{userProfileData.username}</p>
                    </div>
                    <div className="mt-5">
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
                    <div className="mt-5">
                        <div className="mt-3">
                            <button
                                onClick={followUser}
                                className={`px-4 py-2 text-black font-semibold bg-white rounded-full transition duration-200 ${isFollowing ? 'opacity-50 cursor-not-allowed' : ''} ${followLoading ? 'bg-gray-300' : ''}`}
                                disabled={isFollowing || followLoading}
                                aria-pressed={isFollowing}
                                aria-busy={followLoading}
                            >
                                {followLoading ? (
                                    <>
                                        <Loader className="h-4 w-4 animate-spin inline-block" />
                                        <span className="ml-2">Processing...</span>
                                    </>
                                ) : isFollowing ? (
                                    'Following'
                                ) : (
                                    'Follow'
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-12 pb-[58px] md:pb-0 text-white">
                        <h1 className="font-semibold px-5 pt-4 text-lg mb-5">Posts</h1>
                        <div className='border border-white border-opacity-20 md:rounded-3xl rounded-none'>
                            {Array.isArray(userProfilePost) && userProfilePost.length > 0 ? (
                                userProfilePost.map((post) => (
                                    <div
                                        key={post._id}
                                        className="border-b border-white border-opacity-20 md:w-[45vw] px-5 py-4"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-3 items-center justify-start">
                                                {post.author && post.author.profilePicture && (
                                                    <img
                                                        src={post.author.profilePicture}
                                                        alt={post.author.username || 'Author'}
                                                        className="w-8 h-8 rounded-full mr-1"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-white font-semibold">{post.author?.username ?? "anonymous"}</p>
                                                    <p className="font-medium text-xs text-gray-200">{post.author?.fullname ?? "Unknown Author"}</p>
                                                </div>
                                            </div>
                                            <div className="text-white text-xs">
                                                {new Date(post.createdAt).toLocaleDateString()}
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
                                        <div className="mt-8 flex justify-between items-center">
                                            <button
                                                className="text-gray-700 font-semibold cursor-pointer"
                                            >
                                                <span className="flex text-gray-500 hover:text-[#1D9BF0] py-2 px-1 gap-2 items-center justify-center">
                                                    <span>
                                                        <MdOutlineThumbUpOffAlt className="inline-block text-xl md:text-2xl" />
                                                    </span>
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
                                <p>No posts available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersProfile;