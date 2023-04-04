import React from 'react';
import Footer from '../components/Footer.js';
import styled from 'styled-components';

// THIS COMPONENT WRAPS ALL THE PAGES EXCEPT THE HOMEPAGE
const ContentPageTemplate = ({ bgImgUrl, children }) => {
  const Wrapper = styled.div`
    position: relative;
    min-height: 100vh;
    background-image: url(${bgImgUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
  `;

  const ContentWrapper = styled.div`
    padding: 150px 0px 200px;
  `;

  // const bgImgStyles = {
  //   backgroundImage: `url(${bgImgUrl})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundAttachment: 'fixed',
  //   backgroundPosition: 'center',
  //   minHeight: '100vh',
  // };
  return (
    // <div className="position-relative" style={{ ...bgImgStyles }}>
    <Wrapper>
      {/* <div style={{ padding: '150px 0 200px' }}>{children}</div> */}
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Wrapper>
    // </div>
  );
};

export default ContentPageTemplate;
