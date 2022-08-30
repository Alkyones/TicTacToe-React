import React from 'react'
import './ScoreBoard.css';

export const ScoreBoard = ({scores}) => {
    const {xPlayerScore, oPlayerScore} = scores;
    return (
    <div className="score-board">
        <span><span className='scoreboard-x'>X</span> - {xPlayerScore}</span>
        <span><span className='scoreboard-o'>O</span> - {oPlayerScore}</span>
    </div>
  )
}
