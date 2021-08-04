import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, Typography } from '@material-ui/core';



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

const Targeta = (props) => {
  const classes = useStyles();
  useTheme();

  return (
    <Card className={classes.root}>
      <Box alignItems='center' className={classes.details}>
        <CardContent className={classes.content}>
          <Typography align='center' component="h5" variant="h5">
            {props.title}
          </Typography>
          {props.content}
        </CardContent>
      </Box>
    </Card>
  );
}

export default Targeta;