import React from 'react'

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <div className="bg-white rounded" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export const DialogContent = ({ children }) => (
  <div className="p-4">{children}</div>
)

export const DialogHeader = ({ children }) => (
  <div className="border-b p-4">{children}</div>
)

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
)

export const DialogFooter = ({ children }) => (
  <div className="border-t p-4 flex justify-end">{children}</div>
)
