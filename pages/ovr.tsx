import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Slider from '../components/Slider';
import Loading from '../components/Loading';
import { ManualModal } from '../components/Modal';

import useWindowSize from '../lib/useWindowSize';

import { artworks } from '../data';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const OVRPage: React.FC = () => {
  const { index } = React.useContext(AppContext);
  const { innerWidth } = useWindowSize();
  const [manualModalOpen, setManualModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!sessionStorage.getItem('@manual')) {
      setManualModalOpen(true);
    }
  }, []);

  const handleModalClose = React.useCallback(() => {
    sessionStorage.setItem('@manual', 'seen');
    setManualModalOpen(false);
  }, []);

  return (
    <>
      <Head>
        <title>전시장</title>
      </Head>
      <Root>
        {innerWidth < 900 && (
          <ManualModal open={manualModalOpen} close={handleModalClose} />
        )}
        {index ? (
          <Slider
            artworks={artworks}
            pageIndex={index - 1}
            innerWidth={innerWidth}
          />
        ) : (
          <Loading />
        )}
      </Root>
    </>
  );
};

export default OVRPage;
