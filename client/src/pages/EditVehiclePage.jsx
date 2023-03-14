import React, { useContext, useEffect } from 'react';
import EditVehicleForm from '../components/EditVehicleForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ContentPageTemplate from '../components/ContentPageTemplate';
import engineImg from '../assets/engine.jpg';

const EditVehiclePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    isLoggedIn === false && navigate('/login');
  }, []);
  return (
    <div>
      <ContentPageTemplate bgImgUrl={engineImg}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="col-md-8 offset-md-2">
            <EditVehicleForm />
          </div>
        </div>
      </ContentPageTemplate>
    </div>
  );
};

export default EditVehiclePage;
