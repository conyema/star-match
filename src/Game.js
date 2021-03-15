// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import utils from './utils';
import NumKey from './NumKey';
import StarsDisplay from './StarsDisplay';
import Replay from './Replay'

/* custom hook that: 
  - initialize state
  - initialize side effects
  - gives pre-defined behaviours to transact on the state
  NB: - ALWAYS use hooks in the right order; do NOT call hooks inside loop
        or conditions (Rule #1)
      - Name hooks with [use]; it helps linters
*/
const useGameState = () => {
    /* make star-count a state element; we want react to reflect its changes in UI */
  
  // const stars = utils.random(1, 9);
  const [stars, setStars] = useState(utils.random(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [timeLeft, setTimeLeft] = useState(10);

  /* setInterval or setTimeout(more interesting)
   useEffect is a way to introduce side effect for the Game comp
   takes a function it runs whenever the owner comp renders itself
   always remember to clean a side effect introduced when its no longer needed
   done in the return value of the side-effect function: return a func that
   will be called when React is about to unmount or re-render the comp */
  
  useEffect(() => {
    // console.log('done rendering..');
    if (timeLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
    // return () => {console.log('Game is changing: comp re-rendering');}
  });

  const setGameState = (newCandidateNums) => {
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
  };

  return {stars, candidateNums, availableNums, timeLeft, setGameState};
};

const Game = (props) => {
  const {
    stars, 
    candidateNums, 
    availableNums, 
    timeLeft, 
    setGameState
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // const gameIsWon = availableNums.length === 0;
  // const gameIsLost = timeLeft === 0;
  const gameStatus = availableNums.length === 0 
    ? 'won'
    : timeLeft === 0 ? 'lost' 
    : 'active';

  /* function to compute the status to be sent as booleans instead
    of passing unnecesary values(like av, cand nums ) that aren't used in rendering */

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
    if (gameStatus !== 'active' || currStatus === 'used') {
      return;
    }
    // else add num as new candidate if 'avialable' or otherwise
    const newCandidateNums = 
      currStatus === 'available' 
      ? candidateNums.concat(number)
      : candidateNums.filter(cn => cn !== number);
      
    setGameState(newCandidateNums);
  };


  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
        </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ?
           (
             < Replay onClick={props.startNewGame} gameStatus={gameStatus} />
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
      <div className="timer">Time Remaining: {timeLeft} Secs</div>
    </div>
  );
};

export default Game;


/*
- 2 logic to consider in react for every 'behaviour'
 - Game logic to change state; logic for the 'behaviour'
 - UI logic to describe state; what the 'behaviour' is going to change
- to design UI logic u need to come up with what element
  needs to be on the state
- minimize the state in a stteful component; don't put stuff that
  can be computed/derived from other state
*/

/* React structure
  - Hooks into states and any side effects
  - computations based on the state : core Game logic
  - then the return statement
*/

/*  Resetting game 
  1 - reset game state to initial/default values :- enough for
      most cases. But when comp have side effects(eg. subscribing to data, starting a timer etc)
      things can get complicated as u have to reset  side effects.
  
  2(better) - unmount the component from the DOM and remount it
*/
