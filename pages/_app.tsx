import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';
import {
  isMobile,
  isEdge,
  isEdgeChromium,
  browserName,
  isAndroid,
} from 'react-device-detect';
import smoothscroll from 'smoothscroll-polyfill';

import { GlobalCSS } from '../components/GlobalStyle';
import Preparing from '../components/Preparing';

import { getIndex, saveIndex } from '../utils/artwork';
import { initGA, logPageView } from '../lib/analytics';

import AppContext from '../AppContext';

const GlobalStyle = createGlobalStyle`
  ${GlobalCSS}
`;

const App: React.FC<{
  Component: React.FC;
  pageProps: never;
}> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    smoothscroll.polyfill();
    initGA();
  }, []);

  React.useEffect(() => {
    const indexFromStorage = getIndex();
    setIndex(indexFromStorage ?? 1);
  }, [setIndex]);

  React.useEffect(() => {
    if (
      isAndroid &&
      (/Web/.test(browserName) || /Facebook/.test(browserName))
    ) {
      window.location.href = `intent://${window.location.href.split('/')[2]}${
        router.asPath
      }#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      logPageView();
    }
  }, [router.asPath]);

  React.useEffect(() => {
    const refreshHandler = () => {
      if (isMobile) router.reload();
    };
    window.addEventListener('orientationchange', refreshHandler);

    return () =>
      window.removeEventListener('orientationchange', refreshHandler);
  }, [router]);

  const saveAndSetIndex = React.useCallback((newIndex: number) => {
    setIndex(newIndex);
    saveIndex(newIndex);
  }, []);

  if (isEdge && !isEdgeChromium) {
    return (
      <div>
        <h2>예전 엣지 브라우저에서는 전시를 감상할 수 없어요ㅜ.ㅜ</h2>
        <h2>
          보다 원활한 전시 감상을 위해 엣지를 업데이트 하시거나 크롬 브라우저
          사용을 권장합니다.
        </h2>
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noreferrer">
          <h4>크롬 다운받기</h4>
        </a>
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        {/* <meta property="og:title" content="2020 관악 강감찬 축제" />
        <meta property="og:description" content="관악구 온라인 사진전" />
        <meta property="og:image" content="/images/open_graph.jpg" /> */}
        <title>2020 강감찬 미술 공모전 수상작 전시회</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {process.env.NEXT_PUBLIC_IS_PRODUCTION === 'production' ? (
        <Preparing />
      ) : (
        <AppContext.Provider
          value={{
            index,
            setIndex: saveAndSetIndex,
          }}>
          <Component {...pageProps} />
        </AppContext.Provider>
      )}
    </>
  );
};

export default App;
