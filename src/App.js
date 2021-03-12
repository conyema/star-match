// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import utils from './utils';
import NumKey from './NumKey';
import StarsDisplay from './StarsDisplay';

const App = () => {
  // make star-count a state element; we want react to reflect its changes in UI
  // const stars = utils.random(1, 9);
  const [stars, setStars] = useState(utils.random(1, 9));
  const [candidateNums, setCandidateNums] = useState([1, 5]);
  const [availableNums, setAvailableNums] = useState([1, 2, 4, 5, 6, 7]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

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

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
        </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => 
            <NumKey 
              key={number} 
              status={numberStatus(number)} 
              number={number} 
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