import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
  secondary: 'bg-surface text-ink border border-border hover:bg-surface-hover',
  ghost: 'bg-transparent text-ink-muted hover:bg-surface-hover hover:text-ink',
  danger: 'bg-danger text-white hover:opacity-90',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3.5 py-2 text-sm',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    {...props}
  />
);

export default Button;
