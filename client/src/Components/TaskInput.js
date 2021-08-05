import React, { useState } from 'react';
import { addGoal } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

//icons
import PostAddIcon from '@material-ui/icons/PostAdd';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


const TaskInput = (props) => {
  const classes = useStyles();
  const [ goal, setGoal ] = useState('')

  const handleChange = e => {
    setGoal(e.target.value)
  }

  const handleSubmit = e => {
    props.addGoal(goal);
    setGoal('');
    e.preventDefault();
    
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Add New Task"
        inputProps={{ 'aria-label': 'New Task', }}
        onChange={handleChange}
        name='goal'
        value={goal}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="add task">
      <PostAddIcon />
      </IconButton>
    </Paper>
  );
}

export default connect(null, { 
  addGoal 
})(TaskInput)