import React from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Paper 
} from '@mui/material'
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Filters from '../components/Filters';

function Dashboard() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TaskForm />
          <Filters />
        </Box>
        <TaskList />
      </Paper>
    </Container>
  )
}


export default Dashboard