import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'

const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
})

// Persist tasks to localStorage on every state change
store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks))
})

export default store
