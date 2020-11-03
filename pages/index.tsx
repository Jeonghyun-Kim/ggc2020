import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const IndexPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>title</title>
      </Head>
      <Root>
        <></>
      </Root>
    </>
  );
};

export default IndexPage;
