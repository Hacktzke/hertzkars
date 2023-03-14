import React, { useContext, useEffect } from 'react';
import EditUserForm from '../components/EditUserForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ContentPageTemplate from '../components/ContentPageTemplate';
import f1RacecarImg from '../assets/f1-racecar.jpg';

const EditUser = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    isLoggedIn === false && navigate('/login');
  }, []);

  return (
    <div>
      <ContentPageTemplate bgImgUrl={f1RacecarImg}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="col-md-8 offset-md-2">
            <EditUserForm />
          </div>
        </div>
      </ContentPageTemplate>
    </div>
  );
};

export default EditUser;
