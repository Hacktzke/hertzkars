import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VehicleCard } from '../components/VehicleCard';
import axios from 'axios';
import ContentPageTemplate from '../components/ContentPageTemplate';
import DataErrorCard from '../components/DataErrorCard';
import loadingGif from '../assets/loading.gif';
import racetrack2 from '../assets/racetrack2.jpg';

const VehiclePage = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`/api/vehicles/${id}`);
      setVehicle(res.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <ContentPageTemplate bgImgUrl={racetrack2}>
      {loading ? (
        <div className="d-flex justify-content-center vh-75 align-items-center">
          <img width="80px" src={loadingGif}></img>
        </div>
      ) : error ? (
        <div className="container">
          <DataErrorCard />
        </div>
      ) : (
        <div className="container">
          <div className="col-12 col-lg-10 offset-lg-1">
            <VehicleCard vehicle={vehicle}></VehicleCard>
          </div>
        </div>
      )}
    </ContentPageTemplate>
  );
};

export default VehiclePage;
