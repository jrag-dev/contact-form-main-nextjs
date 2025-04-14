import React from 'react'

interface IProps {
    message: string;
}

const InputError = ({ message }: IProps) => {
  return (
    <p className='text-red-custom font-medium text-sm flex items-center gap-2'>
        <span>{message}</span>
    </p>
  )
}

export default InputError
