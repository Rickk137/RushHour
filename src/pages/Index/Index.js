import React, { useState } from 'react';
//componnets
import Board from '../../components/pages/Index/Board/Board';
import Timer from '../../components/pages/Index/Timer/Timer';
import Help from '../../components/pages/Index/Help/Help';
//styles
import classes from './Index.module.scss';

const Index = () => {
  const [freeze, setFreeze] = useState(false);

  return (
    <div className={classes.container}>
      <Timer setFreeze={setFreeze} freeze={freeze} />
      <Board setFreeze={setFreeze} freeze={freeze} />
      <Help />
    </div>
  );
};

export default Index;
