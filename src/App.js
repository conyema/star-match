// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import utils from './utils';
import NumKey from './NumKey';
import StarsDisplay from './StarsDisplay';
import Replay from './Replay'

const App = () => {
  // make star-count a state element; we want react to reflect its changes in UI
  // const stars = utils.random(1, 9);
  const [stars, setStars] = useState(utils.random(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameIsDone = availableNums.length === 0;

  // reset states to initial value
  const resetGame = () => {
    setStars(utils.random(1, 9));
    setCandidateNums([]);
    setAvailableNums(utils.range(1, 9));
  };

  // function to compute the status to be sent as booleans instead
  // of passing unnecesary values(like av, cand nums ) that aren't used in rendering
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong': 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number, currStatus) => {
    // console.log('numKey:', number, 'Status:', currStatus);
    
    // do nothing if its a used number
    if (currStatus === 'used') {
      return;
    }
    // else add num as new candidate if 'avialable' or otherwise
    const newCandidateNums = 
      currStatus === 'available' 
      ? candidateNums.concat(number)
      : candidateNums.filter(cn => cn !== number);
      
    
    // update the game to mark num as candidate
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      /* update the game to mark num as 'used'/candidate
      - get new avail. nums and set it
      - and reset game state
      */
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
    return;
  };


  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
        </div>
      <div className="body">
        <div className="left">
          {gameIsDone ?
           (
             < Replay onClick={resetGame}/>
           ) : (
              <StarsDisplay count={stars} />
            )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => 
            <NumKey 
              key={number} 
              status={numberStatus(number)} 
              number={number} 
              onClick={onNumberClick}
            />
          )} 
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default App;


/*
- 2 logic to consider in react for every 'behaviour'
 - App logic to change state; logic for the 'behaviour'
 - UI logic to describe state; what the 'behaviour' is going to change
- to design UI logic u need to come up with what element
  needs to be on the state
- minimize the state in a stteful component; don't put stuff that
  can be computed/derived from other state
*/

/* React structure
  - Hooks into states and any side effects
  - computations based on the state : core App logic
  - then the return statement
*/

/*  Resetting game 
  1 - reset game state to initial/default values :- enough for
      most cases. But when comp have side effects(eg. subscribing to data, starting a timer etc)
      things can get complicated as u have to reset  side effects.
  
  2 - 
*/


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>