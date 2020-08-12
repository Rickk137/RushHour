import React, { useState, useEffect } from 'react';
//styles
import classes from './Timer.module.scss';

const Timer = ({ freeze, setFreeze }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  function reset() {
    setSeconds(0);
    setFreeze(false);
    setIsActive(true);
  }

  useEffect(() => {
    if (freeze) {
      setIsActive(false);
    }
  }, [freeze]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div>
      <div className={classes.time}>{seconds}s</div>
      <div className={classes.row}>
        <button disabled={!freeze} className={classes.button} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
