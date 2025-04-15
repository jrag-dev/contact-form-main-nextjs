import Image from 'next/image';
import { useEffect } from 'react';

interface ToastProps {
  showMessage: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

const ToastComp = ({ showMessage, message, onClose, duration = 5000 }: ToastProps) => {
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [showMessage, onClose, duration]);

  if (!showMessage) return null;

  return (
    <div className='absolute top-10 md:-top-26 bg-grey-900-custom flex flex-col justify-center items-center gap-4 w-full max-w-[350px] md:max-w-[500px] h-28 rounded-xl px-6 py-6 text-white'>
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
        <span className='font-medium'>{message}</span>
      </p>
    </div>
  );
};

export default ToastComp;