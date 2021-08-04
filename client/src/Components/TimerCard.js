import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, IconButton, Typography } from '@material-ui/core';

//icons
import SettingsIcon from '@material-ui/icons/Settings';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

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

const TimerCard = () => {
  const classes = useStyles();
  useTheme();

  return (
    <Card className={classes.root}>
      <Box alignItems='center' className={classes.details}>
        <CardContent className={classes.content}>
          <Typography align='center' component="h5" variant="h5">
            [Selected Task goes here / 'Timer as default']
          </Typography>
          [timer content goes here]
        </CardContent>
        <Box className={classes.controls}>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.icon} />
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