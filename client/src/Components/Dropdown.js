import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { retrieveGoals, deleteGoal } from '../actions';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
});


class Dropdown extends Component{
  state = {
    goal: null,
  }

  componentDidMount(){
    this.props.retrieveGoals();
  };

  renderGoals(){
    return this.props.goals.map(item => {
      const { goal, id } = item;

      return  <MenuItem value={goal} key={id}>
          <IconButton aria-label='trash'
          onClick={()=>this.props.deleteGoal(id)}
          >
            <DeleteIcon />
          </IconButton> 
          {goal}
          </MenuItem>
    }
    )
  }
  
  handleChange = e => {
    this.setState({ goal : e.target.value })
  }

  render(){ 
    const { classes } = this.props;
    return (
    <FormControl className={classes.formControl}>
    <InputLabel>Goal</InputLabel>
    <Select value={this.state.goal} onChange={this.handleChange} >
      <MenuItem disabled>Select Goal</MenuItem>
      {this.renderGoals()}
    </Select>
  </FormControl>
  )
}
}

const mapStateToProps = state => {
  return{
    goals: Object.values(state.goals)
  }
}

export default connect(mapStateToProps, { retrieveGoals, deleteGoal })(withStyles(styles)(Dropdown))