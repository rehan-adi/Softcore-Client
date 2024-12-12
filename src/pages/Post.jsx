import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { X, Loader2 } from 'lucide-react'
import { BsThreeDots } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import TopNavbar from '../components/TopNavbar'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaRegCommentDots } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useGetPost } from '../hooks/posts/useGetPost'
import { usePostsStore } from '../store/usePostsStore'
import { MdOutlineThumbUpOffAlt } from 'react-icons/md'
import { useLikePost } from '../hooks/posts/useLikePost'
import { useDeletePost } from '../hooks/posts/usePostDelete'
import { useUpdatePost } from '../hooks/posts/useUpdatePost'

function Post() {
  const navigate = useNavigate()

  const [selectedBlog, setSelectedBlog] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editFormData, setEditFormData] = useState({ content: '' })

  // Hooks for fetching posts and managing likes, updates, and deletions
  const { loading, error } = useGetPost()
  const { setPosts, posts } = usePostsStore()
  const { handleUpdatePost, loading: isUpdatingPost } = useUpdatePost()
  const { handleDelete, isDeleting } = useDeletePost(setSelectedBlog)
  const { handleLikePost } = useLikePost()

  // Handling post edit form submission
  const handleEditFormSubmit = async e => {
    e.preventDefault()
    try {
      const postId = selectedBlog._id
      const updatedPost = await handleUpdatePost(postId, {
        content: editFormData.content
      })

      if (updatedPost) {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? { ...post, content: updatedPost.content }
              : post
          )
        )
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error updating the post')
    }
  }

  const handleLike = async postId => {
    try {
      await handleLikePost(postId)
    } catch (error) {
      toast.error('Error liking the post')
    }
  }

  // Handle editing, opening the edit modal
  const handleEdit = blog => {
    setEditFormData({
      content: blog.content
    })
    setSelectedBlog(blog)
    setShowModal(true)
  }

  // Closing the modal
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedBlog(null)
  }

  // Handle changes in the edit form
  const handleEditFormChange = e => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='relative z-10 flex'>
      <TopNavbar />
      <div className='flex min-h-screen w-full items-center justify-center bg-black'>
        {loading ? (
          <div className='mt-[70px] flex min-h-screen w-full flex-col items-center justify-center space-y-6 rounded-none border border-white border-opacity-0 md:w-[45vw] md:rounded-3xl md:border-opacity-20 lg:mt-10'>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className='w-full animate-pulse border-b border-white border-opacity-20 p-6 md:w-[45vw]'
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
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className='mt-10 w-full rounded-3xl border border-white border-opacity-0 pb-[58px] pt-10 md:w-[45vw] md:border-opacity-20 lg:pb-0 lg:pt-4'>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map(post => (
                <div
                  key={post._id}
                  className='relative w-full border-b border-white border-opacity-20 bg-black px-5 py-4'
                >
                  <div className='mb-4 flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                      {post.author?.profilePicture ? (
                        <Link to={`/profile/${post.author._id}`}>
                          <img
                            src={post.author.profilePicture}
                            alt={post.author.username}
                            className='mr-1 h-8 w-8 rounded-full'
                          />
                        </Link>
                      ) : (
                        <div className='h-8 w-8 rounded-full bg-gray-300'></div>
                      )}
                      <div className='flex items-start gap-4'>
                        <div>
                          <Link to={`/profile/${post.author._id}`}>
                            <p className='font-semibold text-white'>
                              {post.author?.username ?? 'anonymous'}
                            </p>
                          </Link>
                          <Link to={`/profile/${post.author._id}`}>
                            <p className='text-xs font-medium text-gray-200'>
                              {post.author?.fullname ?? 'Unknown Author'}
                            </p>
                          </Link>
                        </div>
                        <p className='mt-1 text-xs text-gray-400'>
                          Posted on{' '}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className='relative'>
                      <button
                        onClick={() => setSelectedBlog(post)}
                        className='cursor-pointer font-semibold text-white'
                      >
                        <BsThreeDots className='text-2xl' />
                      </button>
                      {selectedBlog && selectedBlog._id === post._id && (
                        <div className='absolute right-0 top-0'>
                          <div className='z-10 w-48 rounded-md border border-white border-opacity-20 bg-black shadow-lg'>
                            <div className='relative flex flex-col items-center justify-center gap-2 px-1 py-4'>
                              <button
                                onClick={handleCloseModal}
                                className='absolute right-3 top-0 transition-colors'
                              >
                                <span className='text-2xl text-white'>
                                  &times;
                                </span>
                              </button>
                              <button
                                onClick={() => handleEdit(post)}
                                className='mt-6 flex w-[90%] items-center justify-center rounded-lg bg-[#27272A] bg-opacity-70 px-4 py-3 text-left text-white transition-colors duration-150 hover:bg-opacity-80'
                              >
                                <MdOutlineEdit className='mr-3 text-2xl' />
                                <span className='text-base font-medium'>
                                  Edit Post
                                </span>
                              </button>
                              <button
                                onClick={() => handleDelete(post._id)}
                                disabled={isDeleting}
                                className={`flex w-[90%] items-center justify-center rounded-lg bg-[#27272A] bg-opacity-70 px-4 py-3 text-left text-white transition-colors duration-150 hover:bg-opacity-80 ${isDeleting ? 'cursor-not-allowed opacity-50' : ''}`}
                              >
                                {isDeleting ? (
                                  <Loader2 className='mr-3 h-5 w-5 animate-spin' />
                                ) : (
                                  <RiDeleteBin6Line className='mr-3 text-xl' />
                                )}
                                <span className='text-base font-medium'>
                                  {isDeleting ? '' : 'Delete Post'}
                                </span>
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
                    <button
                      onClick={() => handleLike(post._id)}
                      className='flex cursor-pointer items-center gap-2 font-semibold'
                    >
                      <span className='flex items-center justify-center gap-2 px-1 py-2 text-white'>
                        <MdOutlineThumbUpOffAlt className='inline-block text-xl text-white md:text-2xl' />
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
                        <span className='text-sm md:text-base'>Comment</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='flex h-full w-full items-center justify-center'>
                No posts available.
              </div>
            )}
          </div>
        )}
      </div>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='h-[60vh] w-[90vw] rounded-3xl border border-white border-opacity-20 bg-black p-6 lg:h-[58vh] lg:w-[35vw]'>
            <div className='flex items-start justify-between'>
              <h2 className='mb-8 text-xl font-medium lg:mb-4'>Edit Post</h2>
              <button
                type='button'
                onClick={handleCloseModal}
                className='focus:shadow-outline rounded-full p-1 text-white hover:bg-neutral-700 focus:outline-none'
              >
                <X />
              </button>
            </div>
            <form onSubmit={handleEditFormSubmit} encType='multipart/form-data'>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-semibold'
                  htmlFor='bio'
                >
                  Content
                </label>
                <textarea
                  id='bio'
                  name='content'
                  rows='8'
                  value={editFormData.content}
                  onChange={handleEditFormChange}
                  className='focus:shadow-outline w-full appearance-none rounded-2xl border border-white border-opacity-20 bg-black px-4 py-3 leading-tight text-white focus:outline-none'
                />
              </div>
              <div className='mt-8 flex items-center justify-between lg:mt-10'>
                <button
                  type='submit'
                  disabled={isUpdatingPost}
                  className='focus:shadow-outline w-36 rounded-full bg-white px-5 py-2 text-base font-semibold text-black focus:outline-none'
                >
                  {isUpdatingPost ? (
                    <>
                      <Loader2 className='mr-3 inline-block h-5 w-5 animate-spin' />
                    </>
                  ) : (
                    'Update Post'
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

export default Post
