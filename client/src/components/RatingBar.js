import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ratingBar = ({ name, amount, color, linkPath, highestRated }) => {
  const barheight = (amount / highestRated) * 100;

  const SingleBarArea = styled.div`
    position: relative;
    height: 100%;
    width: 40px;
    text-align: center;
  `;

  const ColoredBarWrapper = styled.div`
    width: 15px;
    height: 100px;
    position: relative;
    margin: auto;
  `;

  const ColoredBar = styled.div`
    width: 100%;
    position: absolute;
    height: ${(props) => props.barheight}%;
    background-color: ${(props) => props.color};
    border-radius: 10px;
    bottom: 0px;
  `;

  return (
    <SingleBarArea>
      <ColoredBarWrapper>
        <Link to={linkPath}>
          <ColoredBar barheight={barheight} color={color} />
        </Link>
      </ColoredBarWrapper>
      <Link className="text-reset text-decoration-none" to={linkPath}>
        <div>
          <p className=" small m-0">{amount}</p>
          <p className="small m-0">{name.slice(0, 3).toUpperCase()}</p>
        </div>
      </Link>
    </SingleBarArea>
  );
};

export default ratingBar;

// return (
//   <div
//     className="position-relative"
//     style={{
//       height: '100%',
//       width: '40px',
//       textAlign: 'center',
//       backgroundColor: 'blue',
//     }}
//   >
//     <div
//       style={{
//         width: '15px',
//         height: '100px',
//         position: 'relative',
//         margin: 'auto',
//         backgroundColor: 'green',
//       }}
//     >
//       <Link to={linkPath}>
//         <div
//           style={{
//             width: '100%',
//             position: 'absolute',
//             height: `${barheight}%`,
//             backgroundColor: `${color}`,
//             borderRadius: '10px',
//             bottom: '0px',
//           }}
//         ></div>
//       </Link>
//     </div>
//     <Link className="text-reset text-decoration-none" to={linkPath}>
//       <div>
//         <p className=" small m-0">{amount}</p>
//         <p className="small m-0">{name.slice(0, 3).toUpperCase()}</p>
//       </div>
//     </Link>
//   </div>
// );
