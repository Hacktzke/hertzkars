import React from 'react';
import LoginForm from '../components/LoginForm';
import ContentPageTemplate from '../components/ContentPageTemplate';

function Login() {
  return (
    <div>
      <ContentPageTemplate
        bgImgUrl={
          'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
        }
      >
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="col-md-8 offset-md-2">
            <LoginForm />
          </div>
        </div>
      </ContentPageTemplate>
    </div>
  );
}

export default Login;
