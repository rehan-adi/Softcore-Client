import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDeleteAccount } from '../hooks/auth/useDeleteAccount'
import { useChangePassword } from '../hooks/auth/useChangePassword'
import { changePasswordValidation } from '../validations/auth.validation'

const Settings = () => {
  const navigate = useNavigate()
  const [activeSetting, setActiveSetting] = useState('changePassword')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { handleChangePassword, loading } = useChangePassword()
  const { handleAccountDelete, loading: deleteLoading } = useDeleteAccount()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(changePasswordValidation),
    mode: 'onSubmit'
  })

  const onSubmit = async data => {
    await handleChangePassword({ password: data.password })
    reset()
  }

  const handleDelete = async () => {
    await handleAccountDelete()
    navigate('/signin')
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-start bg-black pt-5 text-white md:px-40'>
      <div className='border-b border-white border-opacity-15 py-7 md:px-10'>
        <ul className='flex items-center gap-8'>
          <li>
            <span
              className={`w-full cursor-pointer p-2 transition ${
                activeSetting === 'changePassword'
                  ? 'border-b-2 border-white'
                  : 'hover:border-b-2 hover:border-white'
              } `}
              onClick={() => setActiveSetting('changePassword')}
            >
              Change Password
            </span>
          </li>
          <li>
            <span
              className={`w-full cursor-pointer p-2 transition ${
                activeSetting === 'deleteAccount'
                  ? 'border-b-2 border-white'
                  : 'hover:border-b-2 hover:border-white'
              } `}
              onClick={() => setActiveSetting('deleteAccount')}
            >
              Delete Account
            </span>
          </li>
        </ul>
      </div>
      <main className='mt-10 flex w-full flex-col items-center justify-center px-5 md:w-[400px] md:px-0'>
        {activeSetting === 'changePassword' && (
          <div className='w-full max-w-lg rounded-lg px-2 py-5 shadow-md'>
            <h1 className='mb-5 text-xl font-semibold'>Change Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type='password'
                placeholder='Enter New Password'
                {...register('password')}
                disabled={loading}
                className='mb-3 w-full rounded-full bg-neutral-800 px-5 py-3 leading-tight text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-neutral-600'
              />
              {errors.password && (
                <span className='inline-block text-red-500'>
                  {errors.password.message}
                </span>
              )}
              <button
                type='submit'
                disabled={loading}
                className='mt-5 w-44 rounded-full bg-white px-4 py-2 font-semibold text-black transition'
              >
                {loading ? (
                  <Loader2 className='mr-3 inline-block h-6 w-6 animate-spin' />
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>
        )}
        {activeSetting === 'deleteAccount' && (
          <div className='w-full max-w-lg rounded-lg px-2 py-5 shadow-md'>
            <h1 className='mb-2 text-xl font-semibold'>Delete Account</h1>
            <p className='text-red-500'>
              This will delete your account and all associated data.
            </p>
            <button
              onClick={() => setShowConfirmation(true)}
              className='mt-5 w-44 rounded-full bg-white px-4 py-2 font-semibold text-black transition'
            >
              Delete Account
            </button>
            {showConfirmation && (
              <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
                <div className='w-[33vw] rounded-lg border border-white border-opacity-20 bg-black p-6'>
                  <h2 className='mb-2 text-lg font-semibold text-white'>
                    Are you absolutely sure?
                  </h2>
                  <p className='w-[89%] text-sm'>
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </p>
                  <div className='mt-6 flex justify-end gap-2.5'>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className='w-24 rounded-full border border-white border-opacity-25 bg-black px-3 py-2 font-semibold text-white transition'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleteLoading}
                      className='w-24 rounded-full bg-white px-3 py-2 font-semibold text-black transition'
                    >
                      {deleteLoading ? (
                        <Loader2 className='inline-block h-5 w-5 animate-spin' />
                      ) : (
                        'Confirm'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Settings
