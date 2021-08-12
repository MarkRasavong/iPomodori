import { Box, IconButton, Typography, withStyles } from "@material-ui/core";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";
import LoopIcon from '@material-ui/icons/Loop';
import React, { Component } from "react";
import { Howl } from 'howler';

//http://soundfxcenter.com/video-games/the-legend-of-zelda/8d82b5_The_Legend_of_Zelda_Secret_Sound_Effect.mp3
//http://soundfxcenter.com/video-games/final-fantasy-vi/8d82b5_Final_Fantasy_VI_Blue_Magic_Sound_Effect.mp3

var breakAudio = new Howl({
  src: [ 'http://soundfxcenter.com/video-games/the-legend-of-zelda/8d82b5_The_Legend_of_Zelda_Secret_Sound_Effect.mp3' ],
});

var successAudio = new Howl({
  src : [ 'http://soundfxcenter.com/video-games/final-fantasy-vi/8d82b5_Final_Fantasy_VI_Blue_Magic_Sound_Effect.mp3' ],
});

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

class Timer extends Component {

  state = {
    onSession: true,
    timerSecond: 0,
    intervalId: 0,
    recordedInterval: 0,
  };

  decreaseTimer = () => {
    if(this.state.timerSecond === 0){
      if(this.props.timerMinute === 0){
        if(this.state.onSession){
          this.setState({
            onSession: false
          });
          this.props.toggleInterval(this.state.onSession);
          breakAudio.play();
          this.setState({ recordedInterval : this.state.recordedInterval + 1 });
          this.props.recordedInterval(this.state.recordedInterval);
        } else {
          this.setState({
            onSession : true
          });
          this.props.toggleInterval(this.state.onSession);
          successAudio.play();
        }
      }
        this.props.updateTimerMinute();
        this.setState({
          timerSecond: 59,
        }) 
    } else {
      this.setState({
        timerSecond: this.state.timerSecond - 1
       })
    }
  }

  play = () =>{
    let intervalId = setInterval(this.decreaseTimer, 1000);
    this.props.onPlayStopTimer(true);
    this.setState({
      intervalId: intervalId
    });
  } 

  pause = () => {
      clearInterval(this.state.intervalId);
      this.props.onPlayStopTimer(false);
    }
  
  refresh = () => {
    this.pause();
    this.props.resetTimer();
    this.props.onPlayStopTimer(false);
    this.setState({
      timerSecond : 0,
      onSession: true
    });
  }

  onPlayStopTimer = () => {
    this.props.onPlayStopTimer();
  }

  render() {
    const  { classes } = this.props;
    return (
      <Box textAlign='center' className={classes.details}>
          <Typography align="center" variant="h4">
            {this.state.onSession === true ? "Session" : "Break"}
          </Typography>
          <Typography align="center" variant="h4">
          <span>{this.props.timerMinute}</span>
          <span>:</span>
          <span>
            {this.props.timerSecond === 0
              ? "00"
              : this.state.timerSecond < 10
              ? "0" + this.state.timerSecond
              : this.state.timerSecond}
          </span>
          </Typography>
          <Box className={classes.controls}>
            { !this.props.isPlaying ?
              <Box alignItems='center' pt={1}>
              <IconButton aria-label="play" onClick={this.play}>
                <PlayArrow className={classes.icon} />
              </IconButton>
            </Box>
            :
            <Box alignItems='center' pt={1}>
              <IconButton aria-label="pause" onClick={this.pause}>
                <Pause className={classes.icon} />
              </IconButton>
            </Box>
            }
            <Box alignItems='center' pt={1}>
              <IconButton aria-label="refresh" onClick={this.refresh}>
                <LoopIcon className={classes.icon} />
              </IconButton>
            </Box>
          </Box>
      </Box>
    );
  }
}

export default withStyles(useStyles)(Timer);
