import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Welcome = () => {
  const { user, setIntroPopup } = useContext(AuthContext);

  return (
    <div className="card-body text-center mx-md-5">
      <h2 className="card-title">Welcome Collector</h2>
      <hr></hr>
      <p className="card-text">
        Hi <i>{user.firstName}</i>, welcome to Hertzkars, a community where you
        can show off your digital garage of all the cars you have ever owned.
        <br></br>
        <br></br>The site is simple, add a vehicle by clicking the "New Vehicle"
        tab. Make sure to add a photo (even if it's not exactly your vehicle and
        please be considerate of the file size. Compress it!) and a good
        description. Once loaded, it will appear in your garage, and as a marker
        with <span style={{ color: user.markerColor }}>your colour</span> on the
        globe where the vehicle was produced.
        <br></br>
        <br></br>Fill the globe with your markers to be the collector with the
        most impressive garage!<br></br>
        <br></br>
        Have fun! - <i>Jeshua</i>
      </p>
      <hr></hr>

      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => {
          setIntroPopup(false);
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default Welcome;
