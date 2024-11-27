import { Loader2 } from 'lucide-react';
import { FaRegCommentDots } from 'react-icons/fa6';
import useFollowUser from '../hooks/useFollowUser';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineThumbUpOffAlt } from 'react-icons/md';
import { useGetUsersProfile } from '../hooks/useGetUsersProfile';

const UsersProfile = () => {
    const navigate = useNavigate();

    const { userProfileData, userProfilePost, loading } = useGetUsersProfile();

    const userId = userProfileData?._id;
    const { isFollowing, followUser, unfollowUser, loading: followLoading } = useFollowUser(userId);

    if (loading) {
        return (
            <div className="min-h-screen flex w-full md:ml-[300px] md:w-[45vw] flex-col space-y-6 justify-center items-center">
                {/* Skeleton structure for the user profile */}
                <div className="py-6 md:w-[45vw] w-full pt-10 animate-pulse">
                    <div className="flex justify-between px-5 items-center mb-8">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-[#27272A] rounded-full"></div>
                        <div className="rounded-full h-10 w-28 bg-gray-200 dark:bg-[#27272A]"></div>
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
                <div className="pt-10 flex justify-center items-center flex-col">
                    <div className="w-full px-5">
                        <div className="flex justify-between items-center">
                            <img
                                src={userProfileData.profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full"
                            />
                            <div className="mt-3">
                                <button
                                    onClick={isFollowing ? unfollowUser : followUser}
                                    className="px-4 py-2 w-28 text-black font-semibold bg-white rounded-full transition duration-200"
                                    disabled={followLoading}
                                >
                                    {followLoading ? (
                                        <>
                                            <Loader2 className="h-6 w-6 animate-spin inline-block" />
                                        </>
                                    ) : isFollowing ? (
                                        'Unfollow'
                                    ) : (
                                        'Follow'
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-xl font-semibold">{userProfileData.fullname}</p>
                            <p className="text-base text-gray-200 font-normal">{userProfileData.username}</p>
                        </div>
                        <div className="mt-5">
                            <p className="text-base lg:w-[31vw] w-[85vw] font-normal">{userProfileData.bio}</p>
                        </div>
                        <div className="mt-5 flex gap-7">
                            <Link to={`/profile/following/${userProfileData._id}`}>
                                <p className="text-base font-bold">
                                    {followingCount} <span className="opacity-60 font-normal">Following</span>
                                </p>
                            </Link>
                            <Link to={`/profile/followers/${userProfileData._id}`}>
                                <p className="text-base font-bold">
                                    {followersCount} <span className="opacity-60 font-normal">Followers</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full mt-12 pb-[58px] md:pb-0 text-white">
                        <h1 className="font-semibold pt-4 px-5 text-lg mb-5">Posts</h1>
                        <div className='border border-white md:border-opacity-20 border-opacity-0 md:rounded-3xl rounded-none'>
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
                                                className="font-semibold cursor-pointer"
                                            >
                                                <span className="flex text-white py-2 px-1 gap-2 items-center justify-center">
                                                    <span>
                                                        <MdOutlineThumbUpOffAlt className="inline-block text-xl md:text-2xl" />
                                                    </span>
                                                    <span className="text-sm md:text-base">{post.likes.length}</span>
                                                </span>
                                            </button>
                                            <button className="text-white font-semibold cursor-pointer"
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
                                <p className='pb-10 w-full h-screen px-5 pt-4'>No posts available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersProfile;