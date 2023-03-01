import React, { useContext, useEffect } from 'react';
import EditVehicleForm from '../components/EditVehicleForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ContentPageTemplate from '../components/ContentPageTemplate';

const EditVehiclePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    isLoggedIn === false && navigate('/login');
  }, []);
  return (
    <div>
      <ContentPageTemplate
        bgImgUrl={
          'https://images.unsplash.com/photo-1564730465543-e732e7fc9c10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1386&q=80'
        }
      >
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
