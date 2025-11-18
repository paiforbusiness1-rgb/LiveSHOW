
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`bg-white text-black px-3 py-2 border-2 border-black outline-none focus:bg-gray-50 placeholder-gray-400 font-light ${className}`}
      {...props}
    />
  );
};

export default Input;
