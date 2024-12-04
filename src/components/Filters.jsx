import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../redux/taskSlice'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'


function Filters() {
  const dispatch = useDispatch()
  const currentFilter = useSelector(state => state.tasks.filter)


  const handleFilterChange = (event, newFilter) => {
    if (newFilter) {
      dispatch(setFilter(newFilter))
    }
  }


  return (
    <ToggleButtonGroup
      value={currentFilter}
      exclusive
      onChange={handleFilterChange}
      aria-label="task filters"
    >
      <ToggleButton value="ALL">All</ToggleButton>
      <ToggleButton value="COMPLETED">Completed</ToggleButton>
      <ToggleButton value="PENDING">Pending</ToggleButton>
      <ToggleButton value="OVERDUE">Overdue</ToggleButton>
    </ToggleButtonGroup>
  )
}


export default Filters