import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 bg-surface border border-border rounded-md text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow ${className}`}
    {...props}
  />
);

export default Input;
