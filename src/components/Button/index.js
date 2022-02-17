import React from 'react';
import s from './Button.module.scss';

const Button = ({ onBtnClick, children }) => {
  return (
    <button onClick={() => onBtnClick()} className={s.root}>
      {children}
    </button>
  );
};

export default Button;
