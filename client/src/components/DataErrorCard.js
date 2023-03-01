import React from 'react';

const DataErrorCard = () => {
  return (
    <div className="card text-center p-5">
      <h5>
        I'm sorry, we could no retrieve the infomation that you wanted.<br></br>{' '}
        Please try again later.
      </h5>
    </div>
  );
};

export default DataErrorCard;
