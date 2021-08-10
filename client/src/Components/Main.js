import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import Targeta from "./Targeta";
import { GiTomato } from "react-icons/gi";
import TaskInput from "./TaskInput";
import IlPomodoro from './TimerCard/IlPomodoro';

const renderConsistency =
  "[# consistent Days of [Task Name] with *random reminders/facts from books";
const renderTotal = `[Task Name] [Tomato icon, # of Hours] under list render 1 tomato as reference to 1 hr & user able to delete task on hover`;


const Main = () => {
    
    return (
    <Container maxWidth="lg">
        {/*     Tomato Title      */}
      <Typography align="center" variant="h2" component="h2">
        I P<GiTomato size="40px" color="red" />m
        <GiTomato size="40px" color="red" />d
        <GiTomato size="40px" color="red" />
        ri
      </Typography>
      <Typography align="center" variant="h6" component="h2">
        The Favorite Tomato Productivity Technique but with more tomatoes.
      </Typography>
        {/*     Tomato Title Ends  */}
      <Box  align='center'>
        <TaskInput />
      </Box>
      <Box display="flex" flexDirection="row">
        <Box p={4}>
          <IlPomodoro />
        </Box>
        <Box p={4}>
          <Targeta title="Consistency" content={renderConsistency} />
        </Box>
        <Box p={4}>
          <Targeta title="Total Pomodori" content={renderTotal} />
        </Box>
      </Box>
    </Container>
  );
};

export default Main;
