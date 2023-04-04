import React from 'react';
import Footer from '../components/Footer.js';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${(props) => props.bgImgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
`;

const ContentWrapper = styled.div`
  padding: 150px 0px 200px;
`;

// THIS COMPONENT WRAPS ALL THE PAGES EXCEPT THE HOMEPAGE
const ContentPageTemplate = ({ bgImgUrl, children }) => {
  return (
    <Wrapper bgImgUrl={bgImgUrl}>
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Wrapper>
  );
};

export default ContentPageTemplate;
