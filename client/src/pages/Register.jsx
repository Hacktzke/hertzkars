import React from 'react';
import RegisterForm from '../components/RegisterForm';
import ContentPageTemplate from '../components/ContentPageTemplate';
import burnoutImg from '../assets/burnout.jpg';

const Register = () => {
  return (
    <div>
      <ContentPageTemplate bgImgUrl={burnoutImg}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="col-md-8 offset-md-2">
            <RegisterForm />
          </div>
        </div>
      </ContentPageTemplate>
    </div>
  );
};

export default Register;
