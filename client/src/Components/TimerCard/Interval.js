import React from 'react';
import { Box, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      maxWidth: 400,
    },
    icon: {
      height: 38,
      width: 38,
    },
  }));
  

const Interval = (props) => {
    const classes = useStyles();
    useTheme();

    return(
        <Box alignItems='center' pt={2}>
            <Box textAlign='center'>
            <Typography variant='p'>{props.name}</Typography>
            </Box>
            <IconButton aria-label='up' onClick={props.handleOnClickIncrese}>
                <KeyboardArrowUpIcon className={classes.icon} />
            </IconButton>
            <Box textAlign='center' onClick={props.handleOnClickDecrease}>
            <Typography variant='h5' alignCenter>{props.length}</Typography>
            </Box>
            <IconButton aria-label='down'>
                <KeyboardArrowDownIcon className={classes.icon} />
            </IconButton>
        </Box>
    )
}

export default Interval;