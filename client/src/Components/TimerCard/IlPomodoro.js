import { Component } from "react";
import { nanoid } from 'nanoid';
import {
    Box,
    Card,
    CardContent,
    IconButton,
    Typography,
    withStyles,
  } from "@material-ui/core";
  
import { connect } from "react-redux";
import { sendRecords } from "../../actions";  
  //icons
import Dropdown from "../Dropdown";
import Timer from "./Timer";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

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

let randomNumber = nanoid(6);

class Pomodoro extends Component{
    today = new Date();
    state = {
          breaklength: 5,
          sessionLength: 25,
          timerMinute: 25,
          isPlaying: false,
          recordedInterval: 0,
          selectedGoal: '',
          selectedGoalId: '',
          timeStamp: null,
          completedDate: null,
          id: randomNumber
      }

onIncreaseSessionLength = () => {
    if(this.state.sessionLength === 60){
        return;
    }
    this.setState({
            sessionLength: this.state.sessionLength + 1,
            timerMinute: this.state.sessionLength + 1
    })
}      
onDecreaseSessionLength = () => {
    if(this.state.sessionLength === 1){
        return;
    }
    this.setState({
        sessionLength: this.state.sessionLength - 1,
        timerMinute: this.state.sessionLength - 1
    })
}

 onIncreaseBreakLength = () => {
     if(this.state.breaklength === 20){
         return;
     }
    this.setState({
          breaklength: this.state.breaklength + 1,
        })
 }

 onDecreaseBreakLength = () => {
     if(this.state.breaklength === 1){
         return;
     }

    this.setState({
          breaklength: this.state.breaklength - 1,
        })
 }

 updateTimerMinute = () => {
         return this.setState({
        timerMinute: this.state.timerMinute - 1
     }
    )
 }

 onToggleInterval = onSession => {
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

 onPlayTimer = isPlaying => {
     this.setState({
         isPlaying : isPlaying
     })
 }

 selectedGoal = prevValue=> {
     this.setState({ 
         selectedGoal: prevValue
     });
 };

 selectedGoalId = prevValue => {
     this.setState({
         selectedGoalId : prevValue
     })
 }

 recordedInterval = prevValue => {
     const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
     this.setState({ recordedInterval :prevValue });
     if(prevValue !== 0){
         const record = {
             sessionTime : this.state.timerMinute,
             goalName: this.state.selectedGoal,
             id: this.state.id,
             timeStapmed: new Date().toLocaleTimeString(),
             date: new Date().toLocaleDateString(options),
         };
         this.props.sendRecords(record);
     }
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
            <Dropdown 
            selectedGoal={this.selectedGoal}
            selectedGoalId={this.selectedGoalId}
            />
          </CardContent>
          {/*TIMER LOGIC*/}
          <Timer
          isPlaying={this.state.isPlaying}
          timerMinute={this.state.timerMinute}
          breakLength={this.state.breaklength}
          updateTimerMinute={this.updateTimerMinute}
          toggleInterval={this.onToggleInterval}
          resetTimer={this.onResetTimer}
          onPlayStopTimer={this.onPlayTimer}
          recordedInterval={this.recordedInterval}          
          /> 
          <Box className={classes.controls}>
            { /* Session Timer Settings*/ }
        <Box alignItems='center' pt={2}>
            <Box textAlign='center'>
            <Typography variant='subtitle2'>Session</Typography>
            </Box>
            <>
            <IconButton aria-label='increase session length' disabled={this.state.isPlaying ? true : false} onClick={this.onIncreaseSessionLength}>
                <KeyboardArrowUp className={classes.icon} />
            </IconButton>
            <Box textAlign='center'>
            <Typography variant='h5'>{this.state.sessionLength}</Typography>
            </Box>
            <IconButton aria-label='decrease session length' disabled={this.state.isPlaying ? true : false} onClick={this.onDecreaseSessionLength}>
                <KeyboardArrowDown className={classes.icon} />
            </IconButton>
            </>
        </Box>
            { /* Break Timer Settings */ }
        <Box alignItems='center' pt={2}>
            <Box textAlign='center'>
            <Typography variant='subtitle2'>Break</Typography>
            </Box>
            <IconButton aria-label='increase break length' disabled={this.state.isPlaying ? true : false} onClick={this.onIncreaseBreakLength} isPlaying={this.state.isPlaying}>
                <KeyboardArrowUp className={classes.icon} />
            </IconButton>
            <Box textAlign='center'>
            <Typography variant='h5'>{this.state.breaklength}</Typography>
            </Box>
            <IconButton aria-label='decrease break length' disabled={this.state.isPlaying ? true : false} onClick={this.onDecreaseBreakLength} isPlaying={this.state.isPlaying}>
                <KeyboardArrowDown className={classes.icon} />
            </IconButton>
        </Box>
          </Box>
          </Box>
      </Card>
      )
   }
}

export default connect(null, { sendRecords })(withStyles(useStyles)(Pomodoro));
