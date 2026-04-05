import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
};

export default function BigButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: BigButtonProps) {
  return (
    <button
      className={[
        'w-full py-5 px-6 text-xl font-bold rounded-xl shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-colors duration-100',
        'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none',
        VARIANT_CLASSES[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
