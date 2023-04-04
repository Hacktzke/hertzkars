import React, { useEffect, useState, useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import Map, { Marker } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import blackMarker from '../assets/blackMarker.svg';
import whiteMarker from '../assets/whiteMarker.svg';
import VehicleModal from '../components/VehicleModal';
import { ThemeContext } from '../contexts/ThemeContext';
import NoVehiclesModal from '../components/NoVehiclesModal';
import RatingCard from '../components/RatingCard';
import HorsepowerCard from '../components/HorsepowerCard';
import styled from 'styled-components';

const ColoredCircle = styled.div`
  background-color: ${(props) => props.color};
  width: 8px;
  height: 8px;
  border: 1px solid black;
  border-radius: 50%;
  margin-bottom: 10px;
  margin: 2px auto;
`;

const CardArea = styled.div.attrs({
  className: 'd-none d-md-block',
})`
  position: absolute;
  bottom: 50px;
  ${(props) => props.position}: 50px;
  z-index: 50;
`;

const Homepage = () => {
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
  mapboxgl.accessToken = token;
  const { isDark } = useContext(ThemeContext);
  const [vehicles, setVehicles] = useState([]);
  const [noVehiclesPopupText, setNoVehiclesPopupText] = useState('');
  const [vehiclePopup, setVehiclePopup] = useState(null);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('/api/vehicles');
      if (!res.data.vehicles) {
        setNoVehiclesPopupText(res.data.message);
      } else {
        setVehicles(res.data.vehicles);
      }
    } catch (err) {
      setNoVehiclesPopupText(
        'We could not retrieve the vehicles sorry. Try again later.'
      );
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const points = vehicles.map((vehicle) => {
    return {
      type: 'Feature',
      properties: {
        vehicle,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(vehicle.hqCoordinates[0]),
          parseFloat(vehicle.hqCoordinates[1]),
        ],
      },
    };
  });

  const { clusters } = useSupercluster({
    points,
    bounds: [
      -353.1249999999998, -46.47783171570974, 153.1249999999959,
      80.0783591287861,
    ],
    zoom: 1,
    maxZoom: 1,
    options: {
      radius: 0,
    },
  });

  const reduceAfter3Decimals = (num) => {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
  };

  const setClusterVehicles = (coordinates) => {
    setVehiclePopup(
      vehicles.filter((vehicle) => {
        vehicle.hqCoordinates[0] = reduceAfter3Decimals(
          vehicle.hqCoordinates[0]
        );
        vehicle.hqCoordinates[1] = reduceAfter3Decimals(
          vehicle.hqCoordinates[1]
        );
        coordinates[0] = reduceAfter3Decimals(coordinates[0]);
        coordinates[1] = reduceAfter3Decimals(coordinates[1]);
        return (
          JSON.stringify(coordinates) === JSON.stringify(vehicle.hqCoordinates)
        );
      })
    );
  };

  window.addEventListener('click', (e) => {
    if (vehiclePopup && e.target.className === 'mapboxgl-canvas') {
      setVehiclePopup(false);
    }
  });

  return (
    <div className="position-relative">
      {noVehiclesPopupText && (
        <NoVehiclesModal
          setNoVehiclesPopupText={setNoVehiclesPopupText}
          noVehiclesPopupText={noVehiclesPopupText}
        ></NoVehiclesModal>
      )}
      <CardArea position="left">
        <RatingCard vehicles={vehicles}></RatingCard>
      </CardArea>
      <CardArea position="right">
        <HorsepowerCard vehicles={vehicles}></HorsepowerCard>
      </CardArea>
      <Map
        initialViewState={{
          longitude: 68,
          latitude: 34,
          zoom: window.innerWidth <= 768 ? 0.75 : 2,
          minZoom: window.innerWidth <= 768 ? 0.75 : 0.5,
          maxZoom: 8,
          projection: 'globe',
        }}
        style={{ width: '100%', height: '100vh' }}
        mapStyle={`mapbox://styles/mapbox/${isDark ? 'dark' : 'light'}-v11`}
      >
        {clusters.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster } = cluster.properties;

          if (isCluster) {
            const markerColorsInCluster = vehicles
              .filter((vehicle) => {
                vehicle.hqCoordinates[0] = reduceAfter3Decimals(
                  Number(vehicle.hqCoordinates[0])
                );
                vehicle.hqCoordinates[1] = reduceAfter3Decimals(
                  Number(vehicle.hqCoordinates[1])
                );
                cluster.geometry.coordinates[1] = reduceAfter3Decimals(
                  cluster.geometry.coordinates[1]
                );
                cluster.geometry.coordinates[0] = reduceAfter3Decimals(
                  cluster.geometry.coordinates[0]
                );

                return (
                  JSON.stringify(cluster.geometry.coordinates) ===
                  JSON.stringify(vehicle.hqCoordinates)
                );
              })
              .map((vehicle) => vehicle.owner.markerColor);

            return (
              <Marker
                key={`${longitude}-${latitude}`}
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
                pitchAlignment="map"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setClusterVehicles([longitude, latitude]);
                }}
              >
                <div>
                  {markerColorsInCluster.map((color, index) => {
                    return <ColoredCircle key={index} color={color} />;
                  })}
                  <img
                    src={isDark ? whiteMarker : blackMarker}
                    alt="Marker of a vehicle"
                  />
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={`${longitude}-${latitude}`}
              scale={0.5}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
              pitchAlignment="map"
              style={{ cursor: 'pointer' }}
              closeOnClick={false}
              color={cluster.properties.vehicle.owner.markerColor}
              onClick={() => {
                setVehiclePopup([cluster.properties.vehicle]);
              }}
            ></Marker>
          );
        })}
      </Map>
      {vehiclePopup && (
        <VehicleModal
          vehiclePopup={vehiclePopup}
          setVehiclePopup={setVehiclePopup}
        ></VehicleModal>
      )}
    </div>
  );
};

export default Homepage;
