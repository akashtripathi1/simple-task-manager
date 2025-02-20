import React from 'react'

export const Textarea = ({ className, ...props }) => (
  <textarea className={`border p-2 rounded-sm ${className}`} {...props} />
)
