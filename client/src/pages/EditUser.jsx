import React, { useContext, useEffect } from 'react';
import EditUserForm from '../components/EditUserForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ContentPageTemplate from '../components/ContentPageTemplate';

const EditUser = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    isLoggedIn === false && navigate('/login');
  }, []);

  return (
    <div>
      <ContentPageTemplate
        bgImgUrl={
          'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
        }
      >
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
