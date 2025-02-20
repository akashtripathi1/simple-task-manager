import React from 'react'

export const Button = ({ children, className, variant, size, ...props }) => {
  let baseClass = 'px-4 py-2 rounded'
  if (variant === 'outline') {
    baseClass += ' border'
  } else if (variant === 'destructive') {
    baseClass += ' bg-red-500 text-white'
  } else if (variant === 'ghost') {
    baseClass += ' bg-transparent'
  }
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
