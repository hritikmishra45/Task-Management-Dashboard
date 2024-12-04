import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'


const theme = createTheme()


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/tasks" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </ThemeProvider>
  )
}


export default App