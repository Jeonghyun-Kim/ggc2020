import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const IndexPage: React.FC = () => {
  return (
    <Root>
      <h4>전시 준비중입니다.</h4>
    </Root>
  );
};

export default IndexPage;
