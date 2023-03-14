import React from 'react';
import Footer from '../components/Footer.js';

const ContentPageTemplate = ({ bgImgUrl, children }) => {
  const bgImgStyles = {
    backgroundImage: `url(${bgImgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };
  return (
    <div className="position-relative" style={{ ...bgImgStyles }}>
      <div style={{ padding: '150px 0 200px' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default ContentPageTemplate;

// import React from 'react';
// import Footer from '../components/Footer.js';

// const ContentPageTemplate = ({ bgSmallImg, bgLargeImg, children }) => {
//   const isMobile = false;
//   const bgImgStyles = {
//     backgroundImage: `url(${isMobile ? bgSmallImg : bgLargeImg})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundAttachment: 'fixed',
//     backgroundPosition: 'center',
//     minHeight: '100vh',
//   };
//   return (
//     <div className="position-relative" style={{ ...bgImgStyles }}>
//       <div style={{ padding: '150px 0 200px' }}>{children}</div>
//       <Footer />
//     </div>
//   );
// };

// export default ContentPageTemplate;
