import React from 'react';
import { Link } from 'react-router-dom';

const ratingBar = ({ name, amount, color, linkPath, highestRated }) => {
  const barheight = (amount / highestRated) * 100;
  return (
    <div
      className="position-relative"
      style={{
        height: '100%',
        width: '40px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '15px',
          height: '100px',
          position: 'relative',
          margin: 'auto',
        }}
      >
        <Link to={linkPath}>
          <div
            style={{
              width: '100%',
              position: 'absolute',
              height: `${barheight}%`,
              backgroundColor: `${color}`,
              borderRadius: '10px',
              bottom: '0px',
            }}
          ></div>
        </Link>
      </div>
      <Link className="text-reset text-decoration-none" to={linkPath}>
        <div>
          <p className=" small m-0">{amount}</p>
          <p className="small m-0">{name.slice(0, 3).toUpperCase()}</p>
        </div>
      </Link>
    </div>
  );
};

export default ratingBar;
