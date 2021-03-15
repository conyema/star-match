// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Game from './Game';

const App = () => {
  const [gameId, setGameId] = useState(1);

  return (
    <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
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