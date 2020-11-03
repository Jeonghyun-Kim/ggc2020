import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = ({ children, ...props }) => {
  return <Main {...props}>{children}</Main>;
};

export default Layout;
