const NumKey = (props) => 
  <button className="number" onClick={()=> console.log('Numkey', props.number)} > {props.number} </button>


export default NumKey;

/* to identify a good candidate for a comp:
  - items that share similar behaviour or data
  - Closure makes the onClick function properly/independently work for each button
  - make numkey re-usable and define some shared behaviour
  - make comp smaller and app more readable like starDisplay comp
  - 



*/