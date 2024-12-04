import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


const initialState = {
  tasks: [
    {
      id: uuidv4(),
      title: 'Sample Task',
      description: 'This is a sample task to get you started',
      dueDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
      completed: false,
      createdAt: new Date().toISOString()
    }
  ],
  filter: 'ALL'
}


const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
      tasks: [],
      filter: 'ALL'
    },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        completed: false
      }
      state.tasks.push(newTask)
    },
    editTask: (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = {
            ...state.tasks[index],
            ...action.payload
          };
        }
      },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    toggleTaskCompletion: (state, action) => {
        const task = state.tasks.find(task => task.id === action.payload)
        if (task) {
          task.completed = !task.completed
        }
      },
      editTask: (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = { 
            ...state.tasks[index], 
            ...action.payload 
          }
        }
      },
  }
})


export const { 
  addTask, 
  editTask, 
  deleteTask, 
  toggleTaskCompletion, 
  setFilter,
} = taskSlice.actions


export default taskSlice.reducer