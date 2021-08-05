import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Countdown = (props) => (
    <CountdownCircleTimer
      isPlaying={props.isPlaying}
      duration={props.duration}
      key={props.key}
      colors={props.colors}
      onComplete={() => {
        // do your stuff here
        return [true, 5000] // repeat animation in 1.5 seconds
      }}
    >
      {({ remainingTime, animatedColor }) => (
        <h2 style={{ color: animatedColor, textAlign: 'center' }}>{props.text}{(<br/>)}{remainingTime}</h2>
      )}
    </CountdownCircleTimer>
    )

  export default Countdown;