import PropTypes from 'prop-types'
import { Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreatePost } from '../hooks/posts/useCreatePost'
import { createPostValidation } from '../validations/post.validation'

function CreatePostModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
      content: '',
      category: '',
      tags: '',
      image: null
    }
  })

  const { loading, onSubmitForm } = useCreatePost()

  const handleFormSubmit = data => {
    onSubmitForm(data, onClose)
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setValue('image', file)
    }
  }

  return (
    <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70'>
      <div className='w-[90%] rounded-3xl border border-white border-opacity-20 bg-black p-4 shadow-md md:w-[40vw] md:p-6'>
        <div className='mb-4 flex items-center justify-between md:mb-5'>
          <h2 className='text-xl font-medium text-white'>Create a Post</h2>
          <button
            className='focus:shadow-outline rounded-full p-1 text-white hover:bg-neutral-700 focus:outline-none'
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          encType='multipart/form-data'
        >
          <div className='mb-4'>
            <label
              htmlFor='content'
              className='mb-2 block text-sm font-semibold'
            >
              Content
            </label>
            <textarea
              id='content'
              className='form-textarea mt-1 block w-full rounded-2xl border border-white border-opacity-30 bg-black px-4 py-3 text-white placeholder:text-white focus:outline-none'
              rows='5'
              placeholder='What do you want to talk about ?'
              {...register('content', { required: 'Content is required' })}
            ></textarea>
            {errors.content && (
              <span className='text-red-500'>{errors.content.message}</span>
            )}
          </div>
          <div className='mb-5 flex flex-col items-center justify-between gap-3 md:gap-5 lg:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='category'
                className='mb-2 block text-sm font-semibold'
              >
                Category
              </label>
              <select
                id='category'
                className='form-select mt-1 block w-full rounded-2xl border border-white border-opacity-30 bg-black px-4 py-3 text-white focus:outline-none'
                {...register('category')}
              >
                <option value=''>Select category...</option>
                <option value='development'>Development</option>
                <option value='frontend'>Coding</option>
                <option value='backend'>Stock Market</option>
                <option value='news'>News</option>
                <option value='trending'>Trending</option>
                <option value='blockchain'>Blockchain</option>
                <option value='politics'>Politics</option>
                <option value='AI'>AI</option>
                <option value='hiring'>Hiring</option>
              </select>
              {errors.category && (
                <span className='text-red-500'>{errors.category.message}</span>
              )}
            </div>
            <div className='w-full'>
              <label
                htmlFor='tags'
                className='mb-2 block text-sm font-semibold'
              >
                Tags
              </label>
              <input
                type='text'
                id='tags'
                className='form-input mt-1 block w-full rounded-2xl border border-white border-opacity-30 bg-black px-4 py-3 text-white placeholder:text-white focus:outline-none'
                placeholder='Separate tags with commas ...'
                {...register('tags')}
              />
            </div>
          </div>
          <div className='mb-4 mt-4'>
            <div className='flex flex-col items-center'>
              <label className='w-full cursor-pointer rounded-2xl border-2 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-400'>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden text-white'
                  {...register('image')}
                  onChange={handleImageChange}
                />
                <div className='flex flex-col items-center justify-center'>
                  <svg
                    className='mb-2 h-8 w-8 text-gray-400 md:h-12 md:w-12'
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
              {errors.image && (
                <span className='text-red-500'>{errors.image.message}</span>
              )}
            </div>
          </div>
          <div className='mt-10 flex justify-start'>
            <button
              className='focus:shadow-outline w-36 rounded-full bg-white px-4 py-2 text-base font-semibold text-black focus:outline-none'
              disabled={loading}
            >
              {loading ? (
                <Loader2 className='inline-block h-5 w-5 animate-spin' />
              ) : (
                'Submit Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

CreatePostModal.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default CreatePostModal
