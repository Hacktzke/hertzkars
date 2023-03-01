import React from 'react';

const ClusterMarker = () => {
  return (
    <div>
      <Marker
        key={index}
        longitude={longitude}
        latitude={latitude}
        anchor="bottom"
        pitchAlignment="map"
        onClick={() => {
          setClusterVehicles([longitude, latitude]);
        }}
      >
        <div>
          <img
            src={marker}
            alt=""
            width={`${10 + (pointCount / points.length) * 150}'px`}
          />
          {pointCount}
          {markerColorsInCluster.map((color) => {
            return (
              <div
                style={{
                  backgroundColor: `${color}`,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  marginBottom: '10px',
                }}
              ></div>
            );
          })}
        </div>
      </Marker>
    </div>
  );
};

export default ClusterMarker;
