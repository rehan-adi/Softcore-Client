import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getToken } from '../utils/token'
import { BsThreeDots } from 'react-icons/bs'
import { BACKEND_API_URL } from '../constant'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Loader2, X, UserPen } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useLikePost } from '../hooks/posts/useLikePost'
import { useProfileStore } from '../store/useProfileStore'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { FaArrowLeftLong, FaRegCommentDots } from 'react-icons/fa6'
import { useProfilePostDelete } from '../hooks/useProfilePostDelete'
import { MdOutlineEdit, MdOutlineThumbUpOffAlt } from 'react-icons/md'

function Profile() {
  const { profileData, posts, loading } = useProfileStore()
  const { updateProfile } = useUpdateProfile()
  const { handleDelete, loading: isDeletingPost } = useProfilePostDelete()
  const { handleLikePost } = useLikePost()
  const { fetchProfileData } = useProfile()

  const navigate = useNavigate()

  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [updatePostLoader, setUpdatePostLoader] = useState(false)

  const [selectedPost, setSelectedPost] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    username: '',
    bio: '',
    image: ''
  })
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false)
  const [editPostFormData, setEditPostFormData] = useState({
    content: ''
  })

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
    setLastScrollY(window.scrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY, controlNavbar])

  const handleEditProfile = () => {
    setEditFormData({
      username: profileData.username,
      bio: profileData.bio,
      profilePicture: profileData.profilePicture
    })
    setIsEditModalOpen(true)
  }

  const handleFileChange = async e => {
    const file = e.target.files[0]
    if (file) {
      try {
        setEditFormData(prevData => ({
          ...prevData,
          profilePicture: file
        }))
      } catch (error) {
        console.error('Error handling file:', error)
      }
    }
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  const handleEditFormChange = e => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleEditFormSubmit = async e => {
    e.preventDefault()
    try {
      await updateProfile(editFormData)
      setIsEditModalOpen(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    }
  }

  const handleEditPost = postId => {
    const post = posts.find(post => post._id === postId)
    setEditPostFormData({
      content: post.content
    })
    setSelectedPost(postId)
    setIsEditPostModalOpen(true)
  }

  const handleEditPostFormChange = e => {
    setEditPostFormData({
      ...editPostFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleEditPostFormSubmit = async e => {
    e.preventDefault()
    setUpdatePostLoader(true)
    const token = getToken()

    try {
      const data = { content: editPostFormData.content }

      const response = await axios.patch(
        `${BACKEND_API_URL}/posts/update/${selectedPost}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        setIsEditPostModalOpen(false)
        toast.success('Post updated successfully!')
        setSelectedPost(null)
        await fetchProfileData()
      }
    } catch (error) {
      toast.error('Failed to update post.')
    } finally {
      setUpdatePostLoader(false)
    }
  }

  const handlePostDelete = async postId => {
    const success = await handleDelete(postId)
    if (success) {
      await fetchProfileData()
      toast.success('Post deleted successfully!')
    } else {
      toast.error('Failed to delete post')
    }
  }

  const closeModel = () => {
    setSelectedPost(null)
  }

  const handleLike = async postId => {
    try {
      await handleLikePost(postId)
    } catch (error) {
      toast.error('Error liking the post')
    }
  }

  if (loading) {
    return (
      <div className='mt-[70px] flex min-h-screen w-full flex-col items-center justify-center space-y-6 md:ml-[300px] md:w-[45vw] lg:mt-12'>
        {/* Skeleton structure for the user profile */}
        <div className='w-full animate-pulse py-6 md:w-[45vw]'>
          <div className='mb-8 flex items-center justify-between px-5'>
            <div className='h-24 w-24 rounded-full bg-gray-200 dark:bg-[#27272A]'></div>
            <div className='h-10 w-24 rounded-full bg-gray-200 dark:bg-[#27272A]'></div>
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

  const followersCount = profileData?.followers?.length || 0
  const followingCount = profileData?.following?.length || 0

  return (
    <div>
      <div className='z-10 min-h-screen w-full items-center bg-black text-white md:px-80'>
        {/*  Profile and Profile Posts */}
        {profileData ? (
          <div className='text-white'>
            <nav
              className={`fixed top-0 z-40 flex h-[70px] w-full items-center gap-10 border-b border-white border-opacity-20 px-3 py-4 transition-transform duration-300 md:hidden lg:px-10 ${
                isScrolled ? '-translate-y-full' : 'translate-y-0'
              }`}
              style={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(0, 0, 0, 0.5)', // Adjust transparency as needed
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Link to='/'>
                <span>
                  <FaArrowLeftLong className='inline-block text-xl' />
                </span>
              </Link>
              <div className=''>
                <p className='text-lg font-semibold'>{profileData.fullname}</p>
                <p className='text-sm font-normal'>{posts.length} posts</p>
              </div>
            </nav>
            <div className='pt-24 lg:pt-10'>
              <div className='flex items-center justify-between px-5 md:px-0'>
                <img
                  src={profileData.profilePicture}
                  alt='Profile'
                  className='h-24 w-24 rounded-full'
                />
                <button
                  onClick={handleEditProfile}
                  className='rounded-full bg-white px-4 py-2 text-base font-semibold text-black'
                >
                  <UserPen size={22} className='mr-1 inline-block' /> Edit
                </button>
              </div>
              <div className='mt-6 px-5 md:px-0'>
                <p className='text-xl font-semibold'>{profileData.fullname}</p>
                <p className='text-base font-normal text-gray-200'>
                  {profileData.username}
                </p>
              </div>
              <div className='mt-5 px-5 md:px-0'>
                <p className='w-[85vw] text-base font-normal lg:w-[31vw]'>
                  {profileData.bio}
                </p>
              </div>
              <div className='mb-10 mt-5 flex gap-7 px-5 md:px-0'>
                <Link to={`/profile/following`}>
                  <p className='text-base font-bold'>
                    {followingCount}{' '}
                    <span className='font-normal opacity-60'>Following</span>
                  </p>
                </Link>
                <Link to={`/profile/followers`}>
                  <p className='text-base font-bold'>
                    {followersCount}{' '}
                    <span className='font-normal opacity-60'>Followers</span>
                  </p>
                </Link>
              </div>
              <div className='mt-2 w-full pb-[58px] text-white md:pb-0'>
                <h1 className='mb-5 px-5 pt-4 text-lg font-semibold md:px-0'>
                  Posts
                </h1>
                <div className='rounded-none border border-white border-opacity-0 md:rounded-3xl md:border-opacity-20'>
                  {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map(post => (
                      <div
                        key={post._id}
                        className='border-b border-white border-opacity-20 px-5 py-4'
                      >
                        <div className='mb-4 flex items-start justify-between'>
                          <div className='flex items-center justify-start gap-3'>
                            {post.author && post.author.profilePicture && (
                              <img
                                src={profileData.profilePicture}
                                alt={post.author.username}
                                className='mr-1 h-8 w-8 rounded-full'
                              />
                            )}
                            <div className='flex items-start gap-4'>
                              <div>
                                <p className='font-semibold text-white'>
                                  {post.author?.username ?? 'anonymous'}
                                </p>
                                <p className='text-xs font-medium text-gray-200'>
                                  {post.author?.fullname ?? 'Unknown Author'}
                                </p>
                              </div>
                              <p className='mt-1 text-xs text-gray-400'>
                                Posted{' '}
                                {new Date(post.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className='relative'>
                            <button
                              onClick={() =>
                                setSelectedPost(
                                  post._id === selectedPost ? null : post._id
                                )
                              }
                              className='cursor-pointer font-semibold'
                            >
                              <BsThreeDots className='text-2xl' />
                            </button>
                            {selectedPost === post._id && (
                              <div className='absolute right-0 top-0'>
                                <div className='z-10 w-48 rounded-md border border-white border-opacity-20 bg-black shadow-lg'>
                                  <div className='relative flex flex-col items-center justify-center gap-2 px-1 py-4'>
                                    <button
                                      onClick={closeModel}
                                      className='absolute right-3 top-1 transition-colors'
                                    >
                                      <span className='text-2xl text-white'>
                                        &times;
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => handleEditPost(post._id)}
                                      className='mt-6 flex w-[90%] items-center justify-center rounded-lg bg-[#27272A] bg-opacity-70 px-4 py-3 text-left text-white transition-colors duration-150 hover:bg-opacity-80'
                                    >
                                      <MdOutlineEdit className='mr-3 text-2xl' />
                                      <span className='text-base font-medium'>
                                        Edit Post
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => handlePostDelete(post._id)}
                                      disabled={isDeletingPost}
                                      className='flex w-[90%] items-center justify-center rounded-lg bg-[#27272A] bg-opacity-70 px-4 py-3 text-left text-white transition-colors duration-150 hover:bg-opacity-80'
                                    >
                                      {isDeletingPost &&
                                      selectedPost === post._id ? (
                                        <>
                                          <Loader2 className='animate-spin text-xl' />
                                        </>
                                      ) : (
                                        <>
                                          <RiDeleteBin6Line className='mr-2 text-xl' />
                                          <span className='text-base font-medium'>
                                            Delete Post
                                          </span>
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
                              className='mb-4 h-60 w-full rounded-xl border border-white border-opacity-15 object-cover md:h-80'
                              src={post.image}
                              alt={post.title}
                            />
                          )}
                        </Link>
                        <p className='ml-1.5 mt-2 text-[#E7E9EA]'>
                          {post.content}
                        </p>
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
                          <button
                            onClick={() => handleLike(post._id)}
                            className='cursor-pointer font-semibold'
                          >
                            <span className='flex items-center justify-center gap-2 px-1 py-2 text-white'>
                              <span>
                                <MdOutlineThumbUpOffAlt className='inline-block text-xl md:text-2xl' />
                              </span>
                              <span className='text-sm md:text-base'>
                                {post.likes.length}
                              </span>
                            </span>
                          </button>
                          <button
                            className='cursor-pointer font-semibold'
                            onClick={() => navigate(`/comments/${post._id}`)}
                          >
                            <span className='flex items-center justify-center gap-2 px-1 py-2 text-white'>
                              <span>
                                <FaRegCommentDots className='inline-block text-xl md:text-2xl' />
                              </span>
                              <span className='text-sm md:text-base'>
                                Comment
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='px-5 pb-32 pt-5'>No posts available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex h-screen w-full flex-col items-center justify-center space-y-5 px-5 text-center'>
            <p className='text-lg font-semibold'>
              You need to sign in to access your profile
            </p>
            <button
              className='rounded-lg bg-white px-5 py-2 font-semibold text-black'
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Edit profile  */}
      {isEditModalOpen && (
        <div className='fixed inset-0 top-[-75px] z-50 flex items-center justify-center bg-black bg-opacity-75 lg:top-0'>
          <div className='h-[82vh] w-[90vw] rounded-3xl border border-white border-opacity-20 bg-black p-6 lg:h-[78vh] lg:w-[35vw]'>
            <div className='mb-5 flex items-center justify-between lg:mb-6'>
              <h2 className='text-xl font-medium'>Edit Profile</h2>
              <button
                type='button'
                onClick={handleCloseEditModal}
                className='focus:shadow-outline rounded-full p-1 text-white hover:bg-neutral-700 focus:outline-none'
              >
                <X />
              </button>
            </div>
            <form onSubmit={handleEditFormSubmit} encType='multipart/form-data'>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-semibold'
                  htmlFor='username'
                >
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={editFormData.username}
                  onChange={handleEditFormChange}
                  className='focus:shadow-outline w-full appearance-none rounded-2xl border border-white border-opacity-30 bg-black px-4 py-3 leading-tight focus:outline-none'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-semibold'
                  htmlFor='bio'
                >
                  Bio
                </label>
                <textarea
                  id='bio'
                  name='bio'
                  value={editFormData.bio}
                  onChange={handleEditFormChange}
                  className='focus:shadow-outline h-28 w-full appearance-none rounded-2xl border border-white border-opacity-30 bg-black px-4 py-3 leading-tight text-white focus:outline-none lg:h-24'
                />
              </div>
              <div className='flex flex-col items-center'>
                <label className='w-full cursor-pointer rounded-2xl border-2 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-400'>
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleFileChange}
                  />
                  <div className='flex flex-col items-center justify-center'>
                    <svg
                      className='mb-2 h-12 w-12 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 16l3-3m0 0l3 3m-3-3v8m13-12a2 2 0 00-2-2h-3.5a2 2 0 01-1.41-.59l-1.5-1.5A2 2 0 0010 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2h-5.5'
                      ></path>
                    </svg>
                    <p className='text-gray-400'>Click to browse files</p>
                  </div>
                </label>
              </div>
              <div className='mt-10 flex items-center justify-between'>
                <button
                  type='submit'
                  className='focus:shadow-outline rounded-full bg-white px-5 py-2 text-base font-semibold text-black focus:outline-none'
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-3 inline-block h-5 w-5 animate-spin' />{' '}
                      saving....
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Post model  */}
      {isEditPostModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='h-[60vh] w-[90vw] rounded-3xl border border-white border-opacity-20 bg-black p-6 lg:h-[59vh] lg:w-[35vw]'>
            <div className='flex items-start justify-between'>
              <h2 className='mb-10 text-xl font-medium lg:mb-6'>Edit Post</h2>
              <button
                type='button'
                onClick={() => setIsEditPostModalOpen(false)}
                className='focus:shadow-outline rounded-full p-1 text-white hover:bg-neutral-700 focus:outline-none'
              >
                <X />
              </button>
            </div>
            <form encType='multipart/form-data'>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-semibold'
                  htmlFor='content'
                >
                  Content
                </label>
                <textarea
                  id='content'
                  name='content'
                  rows='8'
                  value={editPostFormData.content}
                  onChange={handleEditPostFormChange}
                  className='focus:shadow-outline w-full appearance-none rounded-2xl border border-white border-opacity-30 bg-black px-4 py-3 leading-tight text-white focus:outline-none'
                />
              </div>
              <div className='mt-10 flex items-center justify-between'>
                <button
                  type='button'
                  onClick={handleEditPostFormSubmit}
                  className='focus:shadow-outline w-40 rounded-full bg-white px-5 py-2 text-base font-semibold text-black focus:outline-none'
                >
                  {updatePostLoader ? (
                    <>
                      {' '}
                      <Loader2 className='inline-block h-5 w-5 animate-spin' />
                    </>
                  ) : (
                    <>Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
