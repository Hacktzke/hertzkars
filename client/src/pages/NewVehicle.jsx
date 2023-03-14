import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { AuthContext } from '../contexts/AuthContext';
import ContentPageTemplate from '../components/ContentPageTemplate';
import porscheImg from '../assets/porsche.jpg';

const NewVehicle = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    isLoggedIn === false && navigate('/login');
  }, []);

  return (
    <div>
      <ContentPageTemplate bgImgUrl={porscheImg}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="col-md-8 offset-md-2">
            <VehicleForm />
          </div>
        </div>
      </ContentPageTemplate>
    </div>
  );
};

export default NewVehicle;
