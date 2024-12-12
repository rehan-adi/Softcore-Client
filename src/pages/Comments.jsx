import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useComment } from '../hooks/useComment'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { SendHorizonal, ArrowLeft, Loader2 } from 'lucide-react'
import { commentValidation } from '../validations/comment.validation'

const Comments = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(commentValidation),
    mode: 'onSubmit'
  })

  const { getComment, loading, comments, postComment, submitLoading } =
    useComment(postId)

  useEffect(() => {
    getComment()
  }, [postId, getComment])

  const onSubmit = async data => {
    try {
      await postComment(data.content)
      reset()
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center bg-black px-3 py-4 text-white md:py-6'>
      <nav className='mb-5 flex w-full max-w-2xl items-center'>
        <button
          onClick={() => navigate(-1)}
          className='mr-4 rounded-full bg-neutral-800 p-1 hover:bg-neutral-700'
        >
          <ArrowLeft className='text-white' />
        </button>
        <h2 className='text-xl font-semibold'>Comments</h2>
      </nav>
      <div className='mb-6 w-full max-w-2xl flex-1 overflow-y-auto pb-32 md:pb-20'>
        {loading ? (
          <div className='mt-40 flex items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin' />
          </div>
        ) : comments.length === 0 ? (
          <div className='mt-40 flex items-center justify-center'>
            <p className='text-white'>No comments available.</p>
          </div>
        ) : (
          <ul className='space-y-3'>
            {comments.map(comment => (
              <li
                key={comment._id}
                className='flex items-start rounded-lg border border-white border-opacity-15 bg-black p-4 shadow-md'
              >
                {comment.author.profilePicture ? (
                  <img
                    src={comment.author.profilePicture}
                    alt={comment.author.fullname}
                    className='mr-3 h-8 w-8 rounded-full'
                  />
                ) : (
                  <div className='mr-3 h-10 w-10 rounded-full bg-gray-500'></div>
                )}
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <span className='text-base font-semibold'>
                      {comment.author.fullname}
                    </span>
                    <span className='ml-3 text-xs text-gray-400'>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className='mt-2 text-sm font-semibold'>
                    {comment.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='fixed bottom-16 flex w-full max-w-2xl items-center justify-center bg-black px-3 py-5 md:bottom-0 md:py-7'
      >
        <input
          type='text'
          placeholder='Add a comment...'
          maxLength='500'
          className='flex-1 rounded-full bg-neutral-800 px-6 py-3 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-neutral-600'
          name='content'
          {...register('content')}
          disabled={submitLoading}
        />
        <button
          type='submit'
          disabled={submitLoading}
          className='ml-2 flex items-center rounded-lg bg-white p-2 text-black'
        >
          {submitLoading ? (
            <Loader2 className='h-6 w-6 animate-spin' />
          ) : (
            <SendHorizonal className='text-black' />
          )}
        </button>
        {errors.content && (
          <p className='text-xs text-red-500'>{errors.content.message}</p>
        )}
      </form>
    </div>
  )
}

export default Comments
