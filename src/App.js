import React ,{useState} from 'react';
import './App.css';

// components
import {Board} from './components/Board';
import {ScoreBoard} from './components/ScoreBoard';
import {ResetButton} from './components/ResetButton';
 

function App() {
  // 0  1  2 //
  // 3  4  5 //
  // 6  7  8 //
  const win_states = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
  ]

  //create initial board with null value
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xPlayer, setXPlayer] = useState(true) // game always starts with X
  const [gameFinished, setGameFinished] = useState(false)
  const [scoreBoard, setScoreBoard] = useState({xPlayerScore:0, oPlayerScore:0})

  // reset board if game finishes or button clicked
  const resetBoard = () => {
    setGameFinished(false);
    setBoard(Array(9).fill(null));

  }

  //assign value on click
  const handleBoxClick = (boxIndex) => {
    const updateBoard = board.map((value, index) => {
      if(index === boxIndex) {
        return xPlayer === true ? "X" : "O";
      } else {
        return value
      }
    });

    const winnerPlayer = checkWin(updateBoard);

    if(winnerPlayer) {
      if(winnerPlayer === 'O'){
        let {oPlayerScore} = scoreBoard;
        oPlayerScore += 1;
        setScoreBoard({...scoreBoard,oPlayerScore})

      } else {
        let {xPlayerScore} = scoreBoard;
        xPlayerScore += 1;
        setScoreBoard({...scoreBoard,xPlayerScore})
      }};

    setBoard(updateBoard);
    setXPlayer(!xPlayer);

  }

  const checkWin = (board) => {
    for (let i = 0; i < win_states.length; i++) {
      const [x,y,z] = win_states[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]){
        setGameFinished(true); // declare game finished
        return board[x];
      }
  }};



  return (
    <div className="App">
      <ScoreBoard scores={scoreBoard}/>  
      <Board board={board} onClick={ gameFinished ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
