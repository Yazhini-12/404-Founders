import React from 'react';

export function Avatar({ name = 'User', src, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover border border-slate-200 shadow-2xs`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center border border-indigo-400 shadow-2xs`}>
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}
