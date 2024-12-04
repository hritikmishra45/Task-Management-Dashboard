import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
  Box,
  Divider,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import {
  CheckCircle,
  PendingOutlined,
  EventBusy,
  CalendarToday,
  DescriptionOutlined,
  Edit,
  Save,
  Cancel
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { editTask } from '../redux/taskSlice';


function TaskDetailModal({ open, onClose, task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });


  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;


  const getTaskStatus = () => {
    if (task.completed) {
      return (
        <Chip
          icon={<CheckCircle />}
          label="Completed"
          color="success"
        />
      );
    }


    if (isOverdue) {
      return (
        <Chip
          icon={<EventBusy />}
          label="Overdue"
          color="error"
        />
      );
    }


    return (
      <Chip
        icon={<PendingOutlined />}
        label="In Progress"
        color="warning"
      />
    );
  };


  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleSave = () => {
    // Validate input
    if (!editedTask.title) {
      alert('Title is required');
      return;
    }


    // Dispatch edit action
    dispatch(editTask(editedTask));
    setIsEditing(false);
  };


  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          animation: 'fadeIn 0.3s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'scale(0.9)' },
            '100%': { opacity: 1, transform: 'scale(1)' }
          }
        }
      }}
    >
      <DialogTitle>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
        >
          {isEditing ? (
            <TextField
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
              fullWidth
              variant="standard"
            />
          ) : (
            task.title
          )}
          
          <Box display="flex" alignItems="center">
            {getTaskStatus()}
            {!isEditing && (
              <IconButton onClick={handleEdit} color="primary">
                <Edit />
              </IconButton>
            )}
          </Box>
        </Box>
      </DialogTitle>


      <DialogContent>
        {isEditing ? (
          <>
            <TextField
              name="description"
              label="Description"
              value={editedTask.description || ''}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />


            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              value={editedTask.dueDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />


            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button 
                startIcon={<Save />} 
                variant="contained" 
                color="primary"
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button 
                startIcon={<Cancel />} 
                variant="outlined" 
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box mb={2}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <DescriptionOutlined sx={{ mr: 1 }} />
                Description
              </Typography>
              <Typography variant="body1">
                {task.description || 'No description provided'}
              </Typography>
            </Box>


            <Divider sx={{ my: 2 }} />


            <Box>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <CalendarToday sx={{ mr: 1 }} />
                Due Date
              </Typography>
              <Typography variant="body1">
                {task.dueDate}
              </Typography>
            </Box>


            <Box mt={2}>
              <Typography variant="caption" color="textSecondary">
                Created At: {new Date(task.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>


      {!isEditing && (
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}


export default TaskDetailModal;