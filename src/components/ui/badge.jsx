import React from 'react'

export const Badge = ({ children, variant, className }) => {
  let baseClass = 'px-2 py-1 rounded-sm text-sm'
  if (variant === 'destructive') {
    baseClass += ' bg-red-500 text-white'
  } else if (variant === 'secondary') {
    baseClass += ' bg-gray-500 text-white'
  } else {
    baseClass += ' bg-blue-500 text-white'
  }
  return <span className={`${baseClass} ${className}`}>{children}</span>
}
