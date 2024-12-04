import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';


function TaskForm() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });
  const dispatch = useDispatch();


  const handleSubmit = () => {
    if (task.title && task.dueDate) {
      dispatch(addTask(task));
      setTask({ title: '', description: '', dueDate: '' });
      setOpen(false);
    } else {
      alert("Title and due date are required!");
    }
  };


  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            fullWidth
            multiline
          />
          <TextField
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Save Task
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default TaskForm;