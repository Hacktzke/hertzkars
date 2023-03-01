import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import loadingGif from '../assets/loading.gif';
const VehicleTab = lazy(() => import('./VehicleTab'));

const VehicleGrid = ({ vehicles, owner }) => {
  const { themeStyles } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [vehicleArray, setVehicleArray] = useState(vehicles);
  const [searchVal, setSearchVal] = useState('');
  const [sortVal, setSortVal] = useState('');
  const isProfilePage = user && owner && user.id === owner._id ? true : false;

  const sortVehicles = () => {
    if (sortVal) {
      const selectValues = sortVal.split(' ');
      const array = [...vehicleArray];
      if (selectValues[0] === 'asce') {
        const sortedArray = array.sort((a, b) =>
          a[selectValues[1]] > b[selectValues[1]] ? 1 : -1
        );
        setVehicleArray(sortedArray);
      } else {
        const sortedArray = array.sort((a, b) =>
          a[selectValues[1]] < b[selectValues[1]] ? 1 : -1
        );
        setVehicleArray(sortedArray);
      }
    }
  };

  const handleSearchChange = (e) => {
    if (searchVal) {
      const searchArray = vehicles.filter((vehicle) => {
        const vehicleDetails = `${vehicle.year} ${vehicle.manufacture} ${vehicle.model} ${vehicle.owner.firstName} ${vehicle.owner.lastName}  `;
        if (vehicleDetails.toLowerCase().includes(searchVal.toLowerCase())) {
          return vehicle;
        }
      });
      setVehicleArray(searchArray);
    } else {
      setVehicleArray(vehicles);
    }
  };

  useEffect(() => {
    !vehicleArray && setVehicleArray(vehicles);
  });

  useEffect(() => {
    handleSearchChange();
  }, [searchVal]);

  useEffect(() => {
    sortVehicles();
  }, [sortVal]);

  return (
    <div className="card shadow-lg" style={themeStyles.background}>
      <h2 className="card-title text-center mt-3">
        {owner
          ? isProfilePage
            ? 'Your Garage'
            : `${owner.firstName}'s Garage`
          : 'All Vehicles'}
      </h2>
      {owner && isProfilePage && (
        <div className="text-center mt-3">
          <Link to="/vehicles/new" className="btn btn-outline-primary">
            New Vehicle
          </Link>
        </div>
      )}
      {vehicles.length > 1 && (
        <div>
          <div className="container col-md-6 my-3 d-flex">
            <input
              className="form-control"
              type="text"
              id="searchInput"
              value={searchVal}
              placeholder="Search vehicles here..."
              onChange={(e) => {
                setSearchVal(e.target.value);
                setSortVal('');
              }}
            ></input>
            {searchVal && (
              <button
                className="btn btn-outline-primary ms-3"
                type="button"
                onClick={() => {
                  setSearchVal('');
                }}
              >
                Clear
              </button>
            )}
          </div>
          <div className="container col-md-4 my-3">
            <select
              className="form-select "
              id="sort-select"
              value={sortVal}
              onChange={(e) => {
                setSortVal(e.target.value);
              }}
            >
              <option value="" hidden>
                Sort By
              </option>
              <option value="desc createdAt">Latest Added</option>
              <option value="asce year" name="oldest">
                Oldest Vehicles
              </option>
              <option value="desc year">Newest Vehicles</option>
              <option value="asce manufacture">Manufacture</option>
              <option value="asce horsepower">Lowest Horsepower</option>
              <option value="desc horsepower">Highest Horsepower</option>
            </select>
          </div>
        </div>
      )}

      <div className="row position-relative">
        {vehicleArray ? (
          vehicleArray.map((vehicle, index) => {
            return (
              <div
                key={index}
                className={vehicleArray.length > 1 ? 'col-xl-6' : 'col-xl-12'}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <VehicleTab vehicle={vehicle} />
                </Suspense>
              </div>
            );
          })
        ) : (
          <div className="my-5 text-center">
            {/* <h3>
              Sorry, we can't retrieve the vehicles for you.<br></br>Try again
              later...
            </h3> */}
            <img src={loadingGif}></img>
          </div>
        )}
        {searchVal && !vehicleArray.length && (
          <div className="my-5 text-center">
            <h3>
              Sorry no vehicles match your search.<br></br>Please try something
              else...
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleGrid;
