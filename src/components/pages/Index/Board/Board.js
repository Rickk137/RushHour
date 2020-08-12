import React, { useState, useEffect } from 'react';

//boards
import hardBoard from '../../../../config/boards/hard';
// import easyBoard from '../../../../config/boards/easy';

//components
import Car from '../Car/Car';

//styles
import classes from './Board.module.scss';

const Board = ({ setFreeze, freeze }) => {
  const [items, setItems] = useState(hardBoard);
  const [selectedId, setSelectedId] = useState(null);

  const exit = {
    rowStart: 3,
    rowEnd: 4,
    colStart: 7,
    colEnd: 8,
  };

  const calcNewTile = (item, code) => {
    let newTile;
    switch (code) {
      case 'ArrowLeft':
        newTile = {
          x: -1,
          y: 0,
          colStart: item.colStart - 1,
          colEnd: item.colStart,
          rowStart: item.rowStart,
          rowEnd: item.rowStart + 1,
        };
        break;
      case 'ArrowRight':
        newTile = {
          x: +1,
          y: 0,
          colStart: item.colEnd,
          colEnd: item.colEnd + 1,
          rowStart: item.rowStart,
          rowEnd: item.rowStart + 1,
        };
        break;
      case 'ArrowUp':
        newTile = {
          x: 0,
          y: -1,
          colStart: item.colStart,
          colEnd: item.colStart + 1,
          rowStart: item.rowStart - 1,
          rowEnd: item.rowStart,
        };
        break;
      case 'ArrowDown':
        newTile = {
          x: 0,
          y: +1,
          colStart: item.colStart,
          colEnd: item.colStart + 1,
          rowStart: item.rowEnd,
          rowEnd: item.rowEnd + 1,
        };
        break;
      default:
        break;
    }
    return newTile;
  };

  const checkIsAvailble = (newTile, items) => {
    let isEmpty = true;
    if (
      newTile.colStart < 1 ||
      newTile.colEnd > 7 ||
      newTile.rowStart < 1 ||
      newTile.rowEnd > 7
    ) {
      console.log('falseee');
      isEmpty = false;
    }

    if (isEmpty) {
      items.forEach((item) => {
        if (
          item.colStart <= newTile.colStart &&
          newTile.colEnd <= item.colEnd &&
          item.rowStart <= newTile.rowStart &&
          newTile.rowEnd <= item.rowEnd
        ) {
          isEmpty = false;
        }
      });
    }

    return isEmpty;
  };

  useEffect(() => {
    if (!freeze) {
      //reset the game
      setItems(hardBoard);
    }
  }, [freeze]);

  useEffect(() => {
    function onKeyPressed({ code }) {
      if (
        freeze ||
        !selectedId ||
        (code !== 'ArrowLeft' &&
          code !== 'ArrowRight' &&
          code !== 'ArrowUp' &&
          code !== 'ArrowDown')
      )
        return;

      //find selected element
      const item = items.find((item) => item.id === selectedId);

      //check vertical and movment direction
      const vertical = Math.abs(item.colEnd - item.colStart) === 1;
      if (vertical && (code === 'ArrowLeft' || code === 'ArrowRight')) return;
      if (!vertical && (code === 'ArrowUp' || code === 'ArrowDown')) return;

      //calc new title position
      let newTile = calcNewTile(item, code);

      //check if you won the game
      if (item.goal) {
        if (
          newTile.rowStart === exit.rowStart &&
          newTile.rowEnd === exit.rowEnd &&
          newTile.colStart === exit.colStart &&
          newTile.colEnd === exit.colEnd
        ) {
          setFreeze(true);
          alert('congratulation!');
        }
      }

      //check if the new position is available
      let isEmpty = checkIsAvailble(newTile, items);

      if (isEmpty) {
        // move the car to new location
        const newLayout = items.map((item) => {
          if (item.id === selectedId) {
            return {
              ...item,
              rowStart: item.rowStart + newTile.y,
              rowEnd: item.rowEnd + newTile.y,
              colStart: item.colStart + newTile.x,
              colEnd: item.colEnd + newTile.x,
            };
          }
          return item;
        });

        setItems(newLayout);
      }
    }

    document.addEventListener('keydown', onKeyPressed);

    return () => {
      document.removeEventListener('keydown', onKeyPressed);
    };
  }, [exit, freeze, items, selectedId, setFreeze]);

  const toggleItem = (id) => {
    if (!freeze) setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className={classes.boardContainer}>
      <div className={classes.boardWrapper}>
        {items.map((item) => (
          <Car
            onClick={() => toggleItem(item.id)}
            key={item.id}
            active={selectedId === item.id}
            goal={item.goal}
            position={{
              rowStart: item.rowStart,
              rowEnd: item.rowEnd,
              colStart: item.colStart,
              colEnd: item.colEnd,
            }}
            color={item.color}
          />
        ))}
        <div
          className={classes.exit}
          style={{
            gridRowStart: exit.rowStart,
            gridRowEnd: exit.rowEnd,
            gridColumnStart: exit.colStart,
            gridColumnEnd: exit.colEnd,
          }}
        >
          <span className={classes.exitText}>Exit</span>
        </div>
      </div>
    </div>
  );
};

export default Board;
