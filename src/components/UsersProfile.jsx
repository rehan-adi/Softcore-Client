import { Loader2 } from 'lucide-react'
import { FaRegCommentDots } from 'react-icons/fa6'
import useFollowUser from '../hooks/useFollowUser'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineThumbUpOffAlt } from 'react-icons/md'
import { useGetUsersProfile } from '../hooks/useGetUsersProfile'

const UsersProfile = () => {
  const navigate = useNavigate()

  const { userProfileData, userProfilePost, loading } = useGetUsersProfile()

  const userId = userProfileData?._id
  const {
    isFollowing,
    followUser,
    unfollowUser,
    loading: followLoading
  } = useFollowUser(userId)

  if (loading) {
    return (
      <div className='flex min-h-screen w-full flex-col items-center justify-center space-y-6 md:ml-[300px] md:w-[45vw]'>
        {/* Skeleton structure for the user profile */}
        <div className='w-full animate-pulse py-6 pt-10 md:w-[45vw]'>
          <div className='mb-8 flex items-center justify-between px-5'>
            <div className='h-24 w-24 rounded-full bg-gray-200 dark:bg-[#27272A]'></div>
            <div className='h-10 w-28 rounded-full bg-gray-200 dark:bg-[#27272A]'></div>
          </div>
          <div className='mt-6 px-5'>
            <div className='mb-2 h-6 w-36 rounded bg-gray-200 dark:bg-[#27272A]'></div>
            <div className='mb-4 h-4 w-28 rounded bg-gray-200 dark:bg-[#27272A]'></div>
          </div>
          <div className='mt-5 px-5'>
            <div className='mb-4 h-4 w-64 rounded bg-gray-200 dark:bg-[#27272A]'></div>
          </div>
          <div className='mb-10 mt-5 flex gap-7 px-5'>
            <div className='h-4 w-20 rounded bg-gray-200 dark:bg-[#27272A]'></div>
            <div className='h-4 w-20 rounded bg-gray-200 dark:bg-[#27272A]'></div>
          </div>
        </div>
        {/* Skeleton structure for posts */}
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className='mt-32 w-full animate-pulse border-b border-white border-opacity-20 p-6 md:mt-20 md:w-[45vw]'
          >
            <div className='mb-8 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-[#27272A]'></div>
                <div>
                  <div className='mb-1 h-4 w-24 rounded bg-gray-200 dark:bg-[#27272A]'></div>
                  <div className='h-4 w-16 rounded bg-gray-200 dark:bg-[#27272A]'></div>
                </div>
              </div>
              <div className='h-4 w-20 rounded bg-gray-200 dark:bg-[#27272A]'></div>
            </div>
            <div className='mb-4 h-36 rounded bg-gray-200 dark:bg-[#27272A]'></div>
            <div className='mb-2 h-6 rounded bg-gray-200 dark:bg-[#27272A]'></div>
            <div className='mt-6 h-4 w-44 rounded bg-gray-200 dark:bg-[#27272A]'></div>
            <div className='mt-4 flex items-center justify-between'>
              <div className='inline-block h-4 w-16 rounded bg-gray-200 dark:bg-[#27272A]'></div>
              <div className='inline-block h-4 w-16 rounded bg-gray-200 dark:bg-[#27272A]'></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!userProfileData) {
    return (
      <div className='items-centertext-center flex h-screen w-full justify-center pt-80 text-gray-400'>
        User not found
      </div>
    )
  }

  const followersCount = userProfileData?.followers?.length || 0
  const followingCount = userProfileData?.following?.length || 0

  return (
    <div className='z-10 flex min-h-screen w-full items-start justify-center bg-black text-white md:px-80'>
      <div className='flex w-full items-center justify-center md:w-auto'>
        <div className='flex w-full flex-col items-center justify-center px-0 pt-10 md:px-0'>
          <div className='w-full px-5 md:px-0'>
            <div className='flex items-center justify-between'>
              <img
                src={userProfileData.profilePicture}
                alt='Profile'
                className='h-24 w-24 rounded-full'
              />
              <div className='mt-3'>
                <button
                  onClick={isFollowing ? unfollowUser : followUser}
                  className='w-28 rounded-full bg-white px-4 py-2 font-semibold text-black transition duration-200'
                  disabled={followLoading}
                >
                  {followLoading ? (
                    <>
                      <Loader2 className='inline-block h-6 w-6 animate-spin' />
                    </>
                  ) : isFollowing ? (
                    'Unfollow'
                  ) : (
                    'Follow'
                  )}
                </button>
              </div>
            </div>
            <div className='mt-6'>
              <p className='text-xl font-semibold'>
                {userProfileData.fullname}
              </p>
              <p className='text-base font-normal text-gray-200'>
                {userProfileData.username}
              </p>
            </div>
            <div className='mt-5'>
              <p className='w-[85vw] text-base font-normal lg:w-[31vw]'>
                {userProfileData.bio}
              </p>
            </div>
            <div className='mt-5 flex gap-7'>
              <Link to={`/profile/following/${userProfileData._id}`}>
                <p className='text-base font-bold'>
                  {followingCount}{' '}
                  <span className='font-normal opacity-60'>Following</span>
                </p>
              </Link>
              <Link to={`/profile/followers/${userProfileData._id}`}>
                <p className='text-base font-bold'>
                  {followersCount}{' '}
                  <span className='font-normal opacity-60'>Followers</span>
                </p>
              </Link>
            </div>
          </div>
          <div className='mt-12 w-full pb-[58px] text-white md:pb-0'>
            <h1 className='mb-5 px-5 pt-4 text-lg font-semibold md:px-0'>
              Posts
            </h1>
            <div className='rounded-none border border-white border-opacity-0 md:rounded-3xl md:border-opacity-20'>
              {Array.isArray(userProfilePost) && userProfilePost.length > 0 ? (
                userProfilePost.map(post => (
                  <div
                    key={post._id}
                    className='border-b border-white border-opacity-20 px-5 py-4 md:w-[45vw]'
                  >
                    <div className='mb-4 flex items-start justify-between'>
                      <div className='flex items-center justify-start gap-3'>
                        {post.author && post.author.profilePicture && (
                          <img
                            src={post.author.profilePicture}
                            alt={post.author.username || 'Author'}
                            className='mr-1 h-8 w-8 rounded-full'
                          />
                        )}
                        <div>
                          <p className='font-semibold text-white'>
                            {post.author?.username ?? 'anonymous'}
                          </p>
                          <p className='text-xs font-medium text-gray-200'>
                            {post.author?.fullname ?? 'Unknown Author'}
                          </p>
                        </div>
                      </div>
                      <div className='text-xs text-white'>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Link to={`/post/image/${post._id}`}>
                      {post.image && (
                        <img
                          className='mb-4 h-60 w-full rounded-xl border border-white border-opacity-15 object-cover md:h-80'
                          src={post.image}
                          alt={post.title}
                        />
                      )}
                    </Link>
                    <p className='ml-1.5 mt-2 text-[#E7E9EA]'>{post.content}</p>
                    <div className='mt-7'>
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='mr-2 inline-block rounded py-0.5 text-base font-bold text-[#1D9BF0]'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='mt-8 flex items-center justify-between'>
                      <button className='cursor-pointer font-semibold'>
                        <span className='flex items-center justify-center gap-2 px-1 py-2 text-white'>
                          <span>
                            <MdOutlineThumbUpOffAlt className='inline-block text-xl' />
                          </span>
                          <span className='text-sm'>
                            {post.likes.length}
                          </span>
                        </span>
                      </button>
                      <button
                        className='cursor-pointer font-semibold text-white'
                        onClick={() => navigate(`/comments/${post._id}`)}
                      >
                        <span className='flex items-center justify-center gap-2 px-1 py-2 text-white'>
                          <span>
                            <FaRegCommentDots className='inline-block text-xl' />
                          </span>
                          <span className='text-sm'>Comment</span>
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className='h-auto w-full px-5 pb-10 pt-4'>
                  No posts available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersProfile
