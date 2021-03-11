// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import utils from './utils';

const App = () => {
  // make star-count a state element; we want react to reflect its changes in UI
  // const stars = utils.random(1, 9);
  const [stars, setStars] = useState(utils.random(1, 9));

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
        </div>
      <div className="body">
        <div className="left">
          {utils.range(1, stars).map(starId => 
            <div key={starId} className="star" />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => 
            <button key={number} className="number">{number}</button>
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default App;


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