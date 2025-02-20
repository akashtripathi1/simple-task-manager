import React, { createContext, useContext, useState } from 'react'

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const Toaster = () => {
  const { toasts } = useToast()
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`p-4 rounded shadow ${
            toast.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'
          }`}
        >
          <strong>{toast.title}</strong>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  )
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant }) => {
    setToasts(prev => [...prev, { title, description, variant }])
    setTimeout(() => {
      setToasts(prev => prev.slice(1))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
    </ToastContext.Provider>
  )
}
