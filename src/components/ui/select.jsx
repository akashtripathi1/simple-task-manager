import React from 'react'

export const Select = ({ value, onValueChange, children }) => (
  <select value={value} onChange={(e) => onValueChange(e.target.value)}>
    {children}
  </select>
)

export const SelectTrigger = ({ children }) => (
  <div className="inline-block">{children}</div>
)

export const SelectValue = ({ placeholder, ...props }) => (
  <span {...props}>{placeholder}</span>
)

export const SelectContent = ({ children }) => (
  <div className="mt-1">{children}</div>
)

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
)
