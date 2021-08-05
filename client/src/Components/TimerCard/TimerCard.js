import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

//icons
import SettingsIcon from "@material-ui/icons/Settings";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Dropdown from "../Dropdown";
import { workMinutes } from "./time";

const useStyles = makeStyles((theme) => ({
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
}));

// if no tasked selected render Select a task, timer content goes here

const TimerCard = () => {
  const [minutes, setMinutes] = useState(60);
  const [key, setKey] = useState(0);
  const [play, setPlay] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : null;

  const classes = useStyles();
  useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <Box alignItems="center" className={classes.details}>
        <Typography align="center" variant="h5">
          Timer
        </Typography>
        <CardContent className={classes.content}>
          <Dropdown />
        </CardContent>

        {/*Work Timer */}
        <CountdownCircleTimer
      isPlaying={play}
      duration={minutes}
      key={key}
      colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
      onComplete={() => {
        // do your stuff here
        return [true, 5000] // repeat animation in 1.5 seconds
      }}
    >
      {({ remainingTime, animatedColor }) => (
        <h2 style={{ color: animatedColor, textAlign: 'center' }}>{remainingTime}</h2>
      )}
    </CountdownCircleTimer>

        <Box className={classes.controls}>
          <IconButton aria-label="play/pause" onClick={() => setPlay(!play)}>
            {play ? (
              <PauseIcon className={classes.icon} />
            ) : (
              <PlayArrowIcon className={classes.icon} />
            )}
          </IconButton>
          <>
            <IconButton
              aria-describedby={id}
              aria-label="settings"
              onClick={handleClick}
            >
              <SettingsIcon className={classes.icon} />
            </IconButton>
            <Popover
              anchorEl={anchorEl}
              id={id}
              onClose={handleClose}
              open={open}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              {workMinutes.map((interval) => {
                const { minutes } = interval;
                return (
                  <Box p={0.5}>
                    <Button
                      color="primary"
                      onClick={() => {
                        setKey((prevKey) => prevKey + 1);
                        setMinutes(minutes);
                      }}
                    >
                      {minutes} Minutes
                    </Button>
                  </Box>
                );
              })}
            </Popover>
          </>
        </Box>
      </Box>
    </Card>
  );
};

export default TimerCard;
