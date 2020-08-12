import React from 'react';
//styles
import classes from './Car.module.scss';

const Board = ({ position, color, active, onClick, goal }) => {
  return (
    <div
      onClick={onClick}
      className={classes.car + (active ? ' ' + classes.active : '')}
      style={{
        gridRowStart: position.rowStart,
        gridRowEnd: position.rowEnd,
        gridColumnStart: position.colStart,
        gridColumnEnd: position.colEnd,
        background: color,
      }}
    >
      {goal ? 'Goal' : ''}
    </div>
  );
};

export default Board;
