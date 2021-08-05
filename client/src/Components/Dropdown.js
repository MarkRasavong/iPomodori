import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { retrieveGoals } from '../actions';

const styles = (theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
});


class Dropdown extends Component{
  state = {
    time: 20,
  }

  componentDidMount(){
    this.props.retrieveGoals();
  };

  renderGoals(){
    return this.props.goals.map(goal => {
      return (
        <MenuItem value={60}>{goal.goal}</MenuItem>
      )
    })
  }
  


  render(){ 
    const { classes } = this.props;
    return (
    <FormControl className={classes.formControl}>
    <InputLabel>Goal</InputLabel>
    <Select>
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

export default connect(mapStateToProps, { retrieveGoals })(withStyles(styles)(Dropdown))