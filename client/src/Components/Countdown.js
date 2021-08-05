import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Countdown = (props) => (
    <CountdownCircleTimer
      isPlaying={props.isPlaying}
      duration={props.duration}
      colors={[
        ["#004777", 0.4],
        ["#F7B801", 0.4],
        ["#A30000", 0.2],
      ]}
      onComplete={() => {
        
      }}
    >
      {({ remainingTime, animatedColor }) => (
        <h2 style={{ color: animatedColor }}>{remainingTime}</h2>
      )}
    </CountdownCircleTimer>
    )

  export default Countdown;