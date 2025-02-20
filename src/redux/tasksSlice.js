import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload)
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload }
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    completeTask(state, action) {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = true
      }
    }
  }
})

export const { addTask, updateTask, deleteTask, completeTask } = tasksSlice.actions
export default tasksSlice.reducer
