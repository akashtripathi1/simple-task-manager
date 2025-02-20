import React from 'react'

export const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block">{children}</div>
}

export const DropdownMenuTrigger = ({ asChild, children }) => (
  <div>{children}</div>
)

export const DropdownMenuContent = ({ children }) => (
  <div className="absolute bg-white border mt-2 rounded-sm shadow-sm">{children}</div>
)

export const DropdownMenuLabel = ({ children }) => (
  <div className="px-4 py-2 font-bold">{children}</div>
)

export const DropdownMenuSeparator = () => <hr />

export const DropdownMenuItem = ({ onClick, children }) => (
  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
    {children}
  </div>
)
