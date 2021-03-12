// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'red',
  candidate: 'deepskyblue',
};

const NumKey = (props) => 
  <button 
    className="number"
    style={{ backgroundColor: colors[props.status] }} 
    onClick={()=> console.log('Numkey', props.number, props.status)}
  > 
    {props.number} 
  </button>


export default NumKey;

/* to identify a good candidate for a comp:
  - items that share similar behaviour or data
  - Closure makes the onClick function properly/independently work for each button
  - make numkey re-usable and define some shared behaviour
  - make comp smaller and app more readable like starDisplay comp
  - 



*/