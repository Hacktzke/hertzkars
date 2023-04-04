import React, { useContext, useEffect, useState } from 'react';
import RatingBar from './RatingBar';
import { ThemeContext } from '../contexts/ThemeContext';

const RatingCard = ({ vehicles }) => {
  const { isDark } = useContext(ThemeContext);
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    if (vehicles.length) {
      const ownersArray = vehicles.map((vehicle) => {
        return vehicle.owner.firstName;
      });
      const count = ownersArray.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      const ownerRatings = Object.entries(count).sort((a, b) => b[1] - a[1]);
      const topThree = ownerRatings.slice(0, 3);

      topThree.forEach((owner) => {
        vehicles.map((vehicle) => {
          if (vehicle.owner.firstName === owner[0] && !owner[2]) {
            owner.push(vehicle.owner.markerColor);
            owner.push(vehicle.owner._id);
          }
        });
      });
      setTopThree(topThree);
    }
  }, [vehicles]);

  const highestRated = topThree[0] ? topThree[0][1] : null;

  return (
    <div
      className={`card bg-transparent ${
        isDark ? 'border-light text-light' : 'border-dark text-dark'
      }`}
    >
      <div className="card-body text-center">
        <h6 className="card-title">Vehicle Leaderboard</h6>
        <p className="text-muted small">
          <span>{vehicles.length} Vehicles submitted</span>
        </p>
        <div className="card-body d-flex h-100">
          {topThree.map((owner) => {
            return (
              <RatingBar
                key={owner[3]}
                name={owner[0]}
                amount={owner[1]}
                color={owner[2]}
                linkPath={`users/${owner[3]}`}
                highestRated={highestRated}
              ></RatingBar>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
