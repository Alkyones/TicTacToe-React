import React from 'react';
import './Box.css';

export const Box = ({value, onClick}) => {
    const class_name = value === "X" ? 'gameBox X' : 'gameBox O';
    return (
    <button className={class_name} onClick={onClick}>{value}</button>
  )
}
