import { GiCheckMark } from 'react-icons/gi'

function Premium() {
  return (
    <div className='min-h-screen w-full bg-black px-4 py-12 text-white'>
      <h1 className='text-center text-3xl font-bold sm:text-4xl lg:text-5xl'>
        Upgrade to Premium
      </h1>
      <div className='mt-10 flex flex-col-reverse items-center justify-center gap-6 md:mt-20 md:flex-row md:gap-12 lg:gap-14'>
        {/* Basic Plan */}
        <div className='flex w-full flex-col rounded-md bg-[#111112] px-6 py-8 shadow-2xl shadow-[#111112] sm:w-[80%] sm:py-10 md:w-[45%] lg:w-[22%]'>
          <h1 className='mb-4 text-2xl font-normal tracking-tight sm:text-3xl'>
            Basic
          </h1>
          <span className='text-3xl font-semibold sm:text-4xl'>₹0</span>
          <ul className='mt-7 flex flex-grow flex-col gap-3'>
            {[
              'Needs to be Sign in',
              'Limited Access',
              'Create post',
              'Edit post',
              'Delete post',
              'Comment',
              'Like'
            ].map(item => (
              <li key={item} className='flex items-center'>
                <GiCheckMark className='mr-2 inline-block text-lg sm:text-xl' />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Plan */}
        <div className='flex w-full flex-col rounded-md bg-[#0c8ded] px-6 py-8 shadow-2xl shadow-[#0c8ded] sm:w-[80%] sm:py-10 md:w-[45%] lg:w-[22%]'>
          <h1 className='mb-4 text-2xl font-normal tracking-tight sm:text-3xl'>
            Premium
          </h1>
          <span className='text-3xl font-semibold sm:text-4xl'>
            ₹10 <span className='text-sm sm:text-base'>/ Annually</span>
          </span>
          <ul className='mt-7 flex flex-grow flex-col gap-3'>
            {[
              'Small reply boost',
              'Longer posts',
              'Unlimited posts',
              'Chat with AI',
              'Video Call'
            ].map(item => (
              <li key={item} className='flex items-center'>
                <GiCheckMark className='mr-2 inline-block text-lg sm:text-xl' />
                {item}
              </li>
            ))}
          </ul>
          <button className='mt-8 w-full rounded-full bg-white px-5 py-2 font-semibold text-black sm:mt-8 sm:px-7'>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default Premium
