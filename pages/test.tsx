import React from 'react';
import styled from 'styled-components';

import { Award1, Award2, Award3 } from '../components/Icons/Award';
import { ArrowDown } from '../components/Icons/Arrow';

const Root = styled.div`
  width: 100%;
  height: 100%;
  background-color: skyblue;
`;

const TestPage: React.FC = () => {
  return (
    <Root>
      <section className="slider">
        <Award1 />
        <Award2 />
        <Award3 />
        <ArrowDown />
      </section>
    </Root>
  );
};

export default TestPage;
