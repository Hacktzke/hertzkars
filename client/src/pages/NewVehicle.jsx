import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { AuthContext } from '../contexts/AuthContext';
import ContentPageTemplate from '../components/ContentPageTemplate';

const NewVehicle = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    isLoggedIn === false && navigate('/login');
  }, []);

  return (
    <div>
      <ContentPageTemplate
        bgImgUrl={
          'https://images.unsplash.com/photo-1621808752171-531c30903889?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
        }
      >
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
