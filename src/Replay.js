const Replay = (props) => {
  
  return (
    <div className='game-done'>
      <div 
        className='message'
        style={{ color: props.gameStatus === 'won' ? 'green' : 'red' }}
      >
        {props.gameStatus === 'won' ? 'You Won' : 'Game Over'}
      </div>
      <button onClick={props.onClick} >Replay</button>
    </div>
  );
};

export default Replay;