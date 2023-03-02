import React, { useContext, useState, useEffect } from 'react';
import RatingBar from './RatingBar';
import { ThemeContext } from '../contexts/ThemeContext';

const HorsepowerCard = ({ vehicles }) => {
  const { isDark } = useContext(ThemeContext);
  const [topThree, setTopThree] = useState([]);
  const [highestRated, setHighestRated] = useState([]);

  useEffect(() => {
    if (vehicles.length) {
      const sortedArray = vehicles.sort((a, b) => {
        if (!a.horsepower) {
          return 1; // move vehicle without horsepower property to the end
        }
        if (!b.horsepower) {
          return -1; // move vehicle without horsepower property to the end
        }
        return a.horsepower < b.horsepower ? 1 : -1;
      });
      const topThree = sortedArray.slice(0, 3);
      setHighestRated(topThree[0].horsepower);

      setTopThree(topThree);
      console.log(sortedArray);
    }
  }, [vehicles]);
  if (topThree) {
    return (
      <div
        className={`card bg-transparent ${
          isDark ? 'border-light text-light' : 'border-dark text-dark'
        }`}
      >
        <div className="card-body text-center">
          <h6 className="card-title">Power Leaderboard</h6>
          <p className="text-muted small">
            <span>Horsepower Ratings</span>
          </p>
          <div className="card-body d-flex h-100">
            {topThree.map((vehicle, index) => {
              return (
                <RatingBar
                  key={index}
                  name={vehicle.model}
                  amount={vehicle.horsepower}
                  color={vehicle.owner.markerColor}
                  linkPath={`vehicles/${vehicle._id}`}
                  highestRated={highestRated}
                ></RatingBar>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default HorsepowerCard;
