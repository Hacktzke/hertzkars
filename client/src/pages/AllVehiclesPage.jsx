import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleGrid from '../components/VehicleGrid';
import ContentPageTemplate from '../components/ContentPageTemplate';
import loadingGif from '../assets/loading.gif';
import DataErrorCard from '../components/DataErrorCard';
import racetrackImg from '../assets/racetrack.jpg';

const AllVehiclesPage = () => {
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('/api/vehicles');
      setVehicles(res.data.vehicles);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <ContentPageTemplate bgImgUrl={racetrackImg}>
      {loading ? (
        <div className="d-flex justify-content-center vh-75 align-items-center">
          <img width="80px" alt="loading spinner" src={loadingGif}></img>
        </div>
      ) : error ? (
        <div className="container">
          <DataErrorCard />
        </div>
      ) : (
        <div className="container">
          <VehicleGrid vehicles={vehicles} />
        </div>
      )}
    </ContentPageTemplate>
  );
};

export default AllVehiclesPage;
