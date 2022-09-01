import React, { useState } from 'react';
import './App.css';

// components
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { ResetButton } from './components/ResetButton';
// import {SetLimit} from './components/SetLimit';

var moves = 0;
function App() {
  // 0  1  2 //
  // 3  4  5 //
  // 6  7  8 //
  const win_states = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ]


  //create initial board with null value
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xPlayer, setXPlayer] = useState(true) // game always starts with X
  const [gameFinished, setGameFinished] = useState(false)
  const [scoreBoard, setScoreBoard] = useState({ xPlayerScore: 0, oPlayerScore: 0 })
  const [scoreLimit, setScoreLimit] = useState({ scorelimit: 0 }) // init finish point

  // reset board if game finishes or button clicked
  const resetBoard = () => {
    setGameFinished(false);
    setBoard(Array(9).fill(null));
    moves = 0;

  }

  //assign value on click
  const handleBoxClick = (boxIndex) => {
    const updateBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return xPlayer === true ? "X" : "O";
      } else {
        return value
      }
    });

    moves += 1;
    const winnerPlayer = checkWin(updateBoard);

    setBoard(updateBoard);
    setXPlayer(!xPlayer);

    if (winnerPlayer) {

      if (winnerPlayer === 'O') {
        let { oPlayerScore } = scoreBoard;
        oPlayerScore += 1;
        setScoreBoard({ ...scoreBoard, oPlayerScore })

      } else {
        let { xPlayerScore } = scoreBoard;
        xPlayerScore += 1;
        setScoreBoard({ ...scoreBoard, xPlayerScore })
      }
      setXPlayer(true);
    };

   


    // updateBoard after no moves left
    if (moves === 9) { setTimeout(resetBoard, 2000); }

  }

  const checkWin = (board) => {
    for (let i = 0; i < win_states.length; i++) {
      const [x, y, z] = win_states[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameFinished(true); // declare game finished
        return board[x];
      }
    }
  };


  function limitChange(event) {
    const { name, value } = event.target
    setScoreLimit(prevVal => ({
      ...prevVal,
      scorelimit: value
    }))
  }

  const winMessage = () => {
    resetBoard()
    setScoreLimit(prevVal => ({
      ...prevVal,
      scorelimit: 0}))

    setScoreBoard(prevVal => ({...prevVal, xPlayerScore:0,oPlayerScore:0}))
    setXPlayer(true);
  }


  const WinnerMessage = (props) => {
    return(
      <div className="App">
        <div className="winner-message-container">
          <h1>Winner is {props.winner}!</h1>
          <input type='button' className='newGameButton' value='Start New Game!' onClick={winMessage}></input>
        </div>
      </div>
    )
  }

  const RenderComps = () => {
    if (scoreLimit.scorelimit === 0) {
      return (
        <div className="App">
          <div className='win-point-container'>
            <span>How many rounds you want to play ?</span>
            <select id='scorelimit' name='scorelimit' value={scoreLimit.scorelimit} onChange={limitChange} >
              <option value='' selected>Choose</option>
              <option value='1'>1</option>
              <option value='3'>3</option>
              <option value='5'>5</option>
              <option value='7'>7</option>
              <option value='9'>9</option>
            </select>
          </div>
        </div>
      )
    }
    else {

      if(scoreLimit.scorelimit == scoreBoard.xPlayerScore){
        return(
          <WinnerMessage winner='xPlayer' />
        )
      }

      if(scoreLimit.scorelimit == scoreBoard.oPlayerScore){
        return(
          <WinnerMessage winner='oPlayer' />
        )
      }

      else{
      return (
        <div className="App">
          <ScoreBoard scores={scoreBoard} />
          <Board board={board} onClick={gameFinished ? resetBoard : handleBoxClick} />
          <ResetButton resetBoard={resetBoard} />
        </div>)
      }
    }
  }

  return (
    <RenderComps />
  );
}

export default App;
