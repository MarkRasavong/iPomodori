import { withStyles } from "@material-ui/core";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import _, { result } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { retrievePomodori, deletePomodoro } from "../actions";
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/lib/data.json';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = (theme) => ({
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

class PomodoriTotali extends Component {
  componentDidMount() {
    this.props.retrievePomodori();
  }

  render() {
    const { classes } = this.props;

    let goals = this.props.records.reduce( ( accumulator, { sessionTime, goalName} ) => {
      accumulator[goalName] = accumulator[ goalName ] ? (accumulator[goalName] + sessionTime): sessionTime;
      return accumulator;
  }, {} );

  const keyValue = (input) => Object.entries(input).map(([key,value]) => {
    return(
      <>
      <Box>
        <Typography variant='h6' align='left'>
        <IconButton aria-label='trash'
          onClick={()=>this.props.deletePomodoro((key).replace(/%20/g, " "))}
          >
            <DeleteIcon fontSize="small"/>
        </IconButton> 
          {key}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle2' align='right'>
        {value}   { value === 1 ? 'Pomodoro ' : 'Pomodori '}
        <EmojiProvider data={emojiData}>
        <Emoji name='tomato' width='16px'/>
        </EmojiProvider>
        </Typography>
      </Box>
      </>
      )
  })

    return (
      <Card className={classes.root}>
        <Box alignItems="center" className={classes.details}>
          <CardContent className={classes.content}>
            <Typography align="center" component="h5" variant="h5" pd={1}>
              Total Pomodori
            </Typography>
              { 
               keyValue(goals) 
              }
            <EmojiProvider data={emojiData}>
        <Emoji name='tomato' width='20px'/>
        </EmojiProvider> = 1 minute
          </CardContent>
        </Box>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: Object.values(state.records),
  };
};

export default connect(mapStateToProps, { retrievePomodori, deletePomodoro })(
  withStyles(useStyles)(PomodoriTotali)
);
