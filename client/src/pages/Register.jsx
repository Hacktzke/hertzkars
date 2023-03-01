import React from 'react';
import RegisterForm from '../components/RegisterForm';
import ContentPageTemplate from '../components/ContentPageTemplate';

const Register = () => {
  return (
    <div>
      <ContentPageTemplate
        bgImgUrl={
          'https://images.unsplash.com/photo-1569240651738-2c9ec2f50f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80'
        }
      >
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
