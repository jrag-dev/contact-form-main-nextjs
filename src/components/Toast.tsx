import Image from 'next/image'
import React from 'react'

const Toast = () => {
  return (
    <div className='absolute -top-26 bg-grey-900-custom flex flex-col justify-center items-center gap-4 max-w-[500px] h-28 rounded-xl px-6 py-6 text-white'>
      <p className='font-bold flex items-center gap-2 w-full'>
        <Image
          src="/images/icon-success-check.svg"
          width={24}
          height={24}
          alt="Picture of the author"
        />
        <span className='font-bold'>Message Sent!</span>
      </p>
      <p className='w-full text-green-lighter-custom text-sm'>
        <span className='font-medium'>Thanks for completing the form. We'll be in touch soon!</span>
      </p>
    </div>
  )
}

export default Toast
