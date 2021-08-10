import { withStyles } from '@material-ui/core';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrievePomodori } from '../actions';

const useStyles = (theme) => ({
    root: {
      display: 'flex',
      maxWidth: 400,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px',
    },
    content: {
      alignItems: 'center',
      flex: '1 0 auto',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    icon: {
      height: 38,
      width: 38,
    },
  });

class PomodoriTotali extends Component{

    componentDidMount(){
        this.props.retrievePomodori();
    }

    render(){
        const { classes } = this.props;
    return(
    <Card className={classes.root}>
      <Box alignItems='center' className={classes.details}>
        <CardContent className={classes.content}>
          <Typography align='center' component="h5" variant="h5">
            Total Pomodori
          </Typography>
          <Typography variant='h4'>
              
          </Typography>
          [Task Name] [Tomato icon, # of Hours] under list render 1 tomato as reference to 1 hr & user able to delete task on hover
        </CardContent>
      </Box>
    </Card>
    )
    }
}

const mapStateToProps = state => {
    return{
      records: Object.values(state.records)
    }
  }
  

export default connect(mapStateToProps, { retrievePomodori })(withStyles(useStyles)(PomodoriTotali))