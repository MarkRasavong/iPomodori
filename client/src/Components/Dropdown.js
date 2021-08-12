import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { retrieveGoals, deleteGoal, selected } from '../actions';
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
    goal: '',
    goalId: '',
  }

  componentDidMount(){
    this.props.retrieveGoals();
  };

  componentDidUpdate(prevState){
    if(prevState.goal !== this.state.goal){
      this.props.selectedGoal(this.state.goal);
    }
    if(prevState.goalId !== this.state.goalId){
      this.props.selectedGoalId(this.state.goalId)
    }
  }

  renderGoals(){
    return this.props.goals.map(item => {
      const { goal, id } = item;

      return ( 
      <MenuItem 
      value={goal} 
      key={id}
      onClick={() => this.handleClick(goal, id)}
      >
          <IconButton aria-label='trash'
          onClick={()=>this.props.deleteGoal(id)}
          >
            <DeleteIcon />
          </IconButton> 
          {goal}
          </MenuItem>
          )
    }
    )
  }
  
  handleClick = (goal, id) => {
    this.setState({ goalId : id });
    this.setState({ goal : goal });
    this.props.selected();
  }

  render(){ 
    const { classes } = this.props;
    return (
    <FormControl className={classes.formControl}>
    <InputLabel>Goal</InputLabel>
    <Select>
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

export default connect(mapStateToProps, { retrieveGoals, deleteGoal, selected })(withStyles(styles)(Dropdown))