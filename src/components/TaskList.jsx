import React, { useState, useMemo } from 'react';
import { 
  useDispatch, 
  useSelector 
} from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  CardActions,
  Chip,
  Grow,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Delete,
  CheckCircle,
  PendingOutlined,
  EventBusy,
  Search
} from '@mui/icons-material';


import { deleteTask, toggleTaskCompletion } from '../redux/taskSlice';
import TaskDetailModal from './TaskDetailModal';
import ConfirmationModal from './ConfirmationModal';


function TaskList() {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);


  
  const [searchTerm, setSearchTerm] = useState('');


 
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);


  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


 
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
   
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());


     
      const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;


     
      const matchesFilter = 
        (filter === 'COMPLETED' && task.completed) ||
        (filter === 'PENDING' && !task.completed) ||
        (filter === 'OVERDUE' && isOverdue) ||
        filter === 'ALL';


      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filter]);


  
  const handleTaskCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };


  
  const initiateTaskDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteConfirmOpen(true);
  };


  
  const handleTaskDelete = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id));
      setIsDeleteConfirmOpen(false);
      setSelectedTask(null);
    }
  };


  
  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };


  
  const getTaskStatusChip = (task) => {
    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;


    if (task.completed) {
      return (
        <Chip
          icon={<CheckCircle />}
          label="Completed"
          color="success"
          size="small"
        />
      );
    }


    if (isOverdue) {
      return (
        <Chip
          icon={<EventBusy />}
          label="Overdue"
          color="error"
          size="small"
        />
      );
    }


    return (
      <Chip
        icon={<PendingOutlined />}
        label="In Progress"
        color="warning"
        size="small"
      />
    );
  };


  return (
    <>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />


      <Grid container spacing={3}>
        {filteredTasks.length === 0 ? (
          <Grid item xs={12}>
            <Typography 
              variant="body2" 
              color="textSecondary" 
              align="center"
            >
              {searchTerm 
                ? `No tasks found matching "${searchTerm}"` 
                : "No tasks found"
              }
            </Typography>
          </Grid>
        ) : (
          filteredTasks.map((task) => (
            <Grow in key={task.id} timeout={1000}>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: task.completed ? 0.6 : 1,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    },
                    backgroundColor: task.completed ? '#c8e6c9' : '#ffffff',
                  }}
                >
                  <CardContent
                    onClick={() => openTaskDetails(task)}
                    sx={{
                      cursor: 'pointer',
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {task.description}
                    </Typography>
                    <Typography variant="caption">
                      Due: {task.dueDate}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {getTaskStatusChip(task)}
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleTaskCompletion(task.id)}
                    />
                    <IconButton onClick={() => initiateTaskDelete(task)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            </Grow>
          ))
        )}
      </Grid>


      
      {selectedTask && (
        <TaskDetailModal
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          task={selectedTask}
        />
      )}


    
      <ConfirmationModal
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleTaskDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the task "${selectedTask ? selectedTask.title : ''}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="delete"
      />
    </>
  );
}


export default TaskList;