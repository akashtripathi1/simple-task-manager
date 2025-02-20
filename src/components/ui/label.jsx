import React from 'react'

export const Label = ({ children, className, ...props }) => (
  <label className={`block font-medium ${className}`} {...props}>
    {children}
  </label>
)
