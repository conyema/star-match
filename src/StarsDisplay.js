import utils from './utils';

const StarDisplay = (props) => {
  return (
    <>
      {utils.range(1, props.count).map(starId =>
        <div key={starId} className="star" />
      )}
    </>
  )
};

export default StarDisplay;

// Fragment used to avoid using new html elem