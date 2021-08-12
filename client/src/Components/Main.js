import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { GiTomato } from "react-icons/gi";
import TaskInput from "./TaskInput";
import IlPomodoro from './TimerCard/IlPomodoro';
import PomodoriTotali from "./PomodoriTotali";

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
        <Box display='flex' justifyContent='center' mt={4}>
          <Box mr={2}>
          <IlPomodoro />
          </Box>
          <Box ml={2}>
          <PomodoriTotali />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Main;
