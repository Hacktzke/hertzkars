import React from 'react';
import LoginForm from '../components/LoginForm';
import ContentPageTemplate from '../components/ContentPageTemplate';
import carDoorImg from '../assets/car-door.jpg';

function Login() {
  return (
    <div>
      <ContentPageTemplate bgImgUrl={carDoorImg}>
        <div
          className="container position-absolute"
          style={{
            maxWidth: '1000px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <div className="col-md-8 offset-md-2 mb-5">
            <LoginForm />
          </div>
        </div>
      </ContentPageTemplate>
    </div>
  );
}

export default Login;
