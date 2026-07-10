import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ hoverable = false, className = '', ...props }) => (
  <div
    className={`bg-surface border border-border rounded-lg ${
      hoverable ? 'transition-colors hover:bg-surface-hover cursor-pointer' : ''
    } ${className}`}
    {...props}
  />
);

export default Card;
