import { Component } from "react";
import {
    Box,
    Card,
    CardContent,
    IconButton,
    Typography,
    withStyles,
  } from "@material-ui/core";
  
  import { connect } from "react-redux";
  
  //icons
import Dropdown from "../Dropdown";
import Interval from "./Interval";
import Timer from "./Timer";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";

const useStyles = theme => ({
    root: {
      display: "flex",
      maxWidth: 400,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      margin: "20px",
    },
    content: {
      alignItems: "center",
      flex: "1 0 auto",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    icon: {
      height: 38,
      width: 38,
    },
  });

class Pomodoro extends Component{
    state = {
          breaklength: 5,
          sessionLength: 25,
          timerMinute: 25,
          play: false,
          isPlaying: false,
      }
onIncreaseSessionLength = () => {
    if(this.state.sessionLength === 60){
        return;
    }
    this.setState({
            sessionLength: this.state.sessionLength + 5,
            timerMinute: this.state.sessionLength + 5
    })
}      
onDecreaseSessionLength = () => {
    if(this.state.sessionLength === 5){
        return;
    }
    this.setState({
        sessionLength: this.state.sessionLength - 5,
        timerMinute: this.state.sessionLength - 5
    })
}

 onIncreaseBreakLength = () => {
     if(this.state.breaklength === 20){
         return;
     }
    this.setState({
          breaklength: this.state.breaklength + 5,
        })
 }

 onDecreaseBreakLength = () => {
     if(this.state.breaklength === 5){
         return;
     }

    this.setState({
          breaklength: this.state.breaklength - 5,
        })
 }

 updateTimerMinute = () => {
         return this.setState({
        timerMinute: this.state.timerMinute - 1
     }
    )
 }

 onToggleInterval(onSession){
    if(onSession){
        return this.setState({
         timerMinute: this.state.sessionLength
        })
    }else {
        this.setState({
            timerMinute: this.state.breaklength
        })
    }
 }

 onResetTimer = () => {
     return this.setState({
         timerMinute: this.state.sessionLength
     })
 }

 onPlayTimer = (isPlaying) => {
     this.setState({
         isPlaying : isPlaying
     })
 }

    render(){
        const  { classes } = this.props;
      return (
      <Card className={classes.root}>
        <Box alignItems="center" className={classes.details}>
          <Typography align="center" variant="h5">
            Timer
          </Typography>
          <CardContent className={classes.content}>
            <Dropdown />
          </CardContent>
          {/*TIMER LOGIC*/}
          <Timer 
          timerMinute={this.state.timerMinute}
          breakLength={this.state.breaklength}
          updateTimerMinute={this.updateTimerMinute}
          toggleInterval={this.onToggleInterval}
          resetTimer={this.onResetTimer}
          onPlayStopTimer={this.onPlayTimer}
          /> 
          <Box className={classes.controls}>
            { /* Session Timer Settings*/ }
        <Box alignItems='center' pt={2}>
            <Box textAlign='center'>
            <Typography variant='p'>Session</Typography>
            </Box>
            <>
            <IconButton aria-label='increase session length' disabled={this.props.isPlaying ? true : false} onClick={this.onIncreaseSessionLength} isPlaying={this.state.isPlaying}>
                <KeyboardArrowUp className={classes.icon} />
            </IconButton>
            <Box textAlign='center'>
            <Typography variant='h5' alignCenter>{this.state.sessionLength}</Typography>
            </Box>
            <IconButton aria-label='decrease session length' disabled={this.props.isPlaying ? true : false} onClick={this.onDecreaseSessionLength} isPlaying={this.state.isPlaying}>
                <KeyboardArrowDown className={classes.icon} />
            </IconButton>
            </>
        </Box>
            { /* Break Timer Settings */ }
        <Box alignItems='center' pt={2}>
            <Box textAlign='center'>
            <Typography variant='p'>Break</Typography>
            </Box>
            <IconButton aria-label='increase break length' disabled={this.props.isPlaying ? true : false} onClick={this.onIncreaseBreakLength} isPlaying={this.state.isPlaying}>
                <KeyboardArrowUp className={classes.icon} />
            </IconButton>
            <Box textAlign='center'>
            <Typography variant='h5' alignCenter>{this.state.breaklength}</Typography>
            </Box>
            <IconButton aria-label='decrease break length' disabled={this.props.isPlaying ? true : false} onClick={this.onDecreaseBreakLength} isPlaying={this.state.isPlaying}>
                <KeyboardArrowDown className={classes.icon} />
            </IconButton>
        </Box>
          </Box>
          </Box>
      </Card>
      )
   }
}

export default withStyles(useStyles)(Pomodoro);