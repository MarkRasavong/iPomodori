import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, IconButton, Typography } from '@material-ui/core';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

//icons
import SettingsIcon from '@material-ui/icons/Settings';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Dropdown from './Dropdown';

const useStyles = makeStyles((theme) => ({
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
}));


          // if no tasked selected render Select a task, timer content goes here

const TimerCard = () => {
  const [play, setPlay] = useState(false);

  const classes = useStyles();
  useTheme();

  const Countdown = () => (
    <CountdownCircleTimer
    isPlaying={play}
    duration={60}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
  >
    {({ remainingTime, animatedColor }) => (
      <h2 style={{ color: animatedColor }}>
        {remainingTime}
      </h2>
    )}
  </CountdownCircleTimer>
  )

  return (
    <Card className={classes.root}>
      <Box alignItems='center' className={classes.details}>
        <Typography align='center' variant="h5">
            Timer
        </Typography>
        <CardContent className={classes.content}>
          <Dropdown /> 
        </CardContent>

        <Countdown />

        <Box className={classes.controls}>

          <IconButton aria-label="play/pause" onClick={() => setPlay(!play) }>
            {play ? <PauseIcon className={classes.icon}/> : <PlayArrowIcon className={classes.icon} />}
          </IconButton>

          <IconButton aria-label="settings">
            <SettingsIcon className={classes.icon} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default TimerCard;