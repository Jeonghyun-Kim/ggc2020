import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';

import { ArrowDown } from '../components/Icons/Arrow';
import ArtworkListItem from '../components/ArtworkListItem';
import Footer from '../components/Footer';

import useWindowSize from '../lib/useWindowSize';
import { getDivisionKor } from '../utils/division';

import { artworks } from '../data';

const GAP = {
  mobile: 7,
  desktop: 13,
};

const PADDING = {
  mobile: 10,
  desktop: 32,
};

const INFO_HEIGHT = {
  mobile: 48,
  desktop: 72,
};

const Root = styled.div`
  width: 100%;
  height: 100%;
  section {
    overflow: hidden;
  }
  .slider {
    position: relative;
    max-width: initial;
    width: 100%;
    height: 100%;
    background-color: #f7cd38;
    display: flex;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/images/slider_m.jpg');
      background-size: cover;
      /* background-position: center bottom; */
      #logo-group {
        display: none;
      }
    }
    .title-block {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .top {
        margin-top: 30px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        #title-image {
          width: 90% !important;
          height: auto !important;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        .title {
          width: 100%;
          margin: 16px 0;
          padding-right: 32px;
          text-align: right;
          font-size: 1.6rem;
          color: #21535f;
          font-weight: 700;
          z-index: 1;
        }
      }
      #go-down-button {
        margin-bottom: 16px;
        #arrow-down {
          width: 50px;
          height: auto;
        }
      }
    }
  }
  .gallery {
    .title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      color: #21535f;
    }
    .division {
      .award-group {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
      }
      .list-container {
        padding: 0 ${PADDING.mobile}px;
        display: grid;
        grid-gap: ${GAP.mobile}px;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }
    }
  }
  .ack {
    background-color: #dbdbdb;
    padding: 48px 16px 0 16px;
    & > * {
      max-width: 800px;
      margin: 0 auto;
    }
    .title {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .division {
      margin: 15px auto;
      margin-bottom: 0;
      font-size: 0.75rem;
      font-weight: 400;
      word-break: keep-all;
      p {
        font-weight: 500;
      }
    }
    .divider {
      height: 1px;
      margin-top: 32px;
      background-color: #707070;
    }
  }
  &.desktop {
    .slider {
      .background {
        position: relative;
        width: 60%;
        background-image: url('/images/slider_w.jpg');
        background-position: center;
        & > div {
          position: absolute;
          right: 50px;
          bottom: 50px;
          width: min(20vw, 340px) !important;
          height: auto;
          object-fit: contain;
        }
        #logo-group {
          display: block;
        }
      }
      .title-block {
        width: 40%;
        .top {
          margin-top: 50px;
          .title {
            padding-right: 64px;
            font-size: 3rem;
            font-weight: 700;
          }
        }
        #go-down-button {
          margin-bottom: 48px;
          #arrow-down {
            width: 50px;
            height: auto;
          }
        }
      }
    }
    .gallery {
      .division {
        .list-container {
          padding: 0 ${PADDING.desktop}px;
          display: grid;
          grid-gap: ${GAP.desktop}px;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        }
      }
    }
    .ack {
      .title {
        font-size: 1.2rem;
      }
      .division {
        font-size: 1rem;
        p {
          font-size: 1.1rem;
        }
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const { innerWidth, innerHeight } = useWindowSize();
  const isDesktop = innerWidth >= 900;

  const getPhotoSize = React.useCallback(() => {
    const containerWidth = Math.min(innerWidth, 1100);
    const padding = innerWidth < 900 ? PADDING.mobile : PADDING.desktop;
    const gap = innerWidth < 900 ? GAP.mobile : GAP.desktop;
    const columns = Math.floor(
      (containerWidth - 2 * padding) / ((innerWidth < 900 ? 140 : 230) + gap),
    );
    const photoSize =
      (containerWidth - 2 * padding - (columns - 1) * gap) / columns;

    return photoSize;
  }, [innerWidth]);

  const infoHeight = React.useMemo(
    () => (innerWidth < 900 ? INFO_HEIGHT.mobile : INFO_HEIGHT.desktop),
    [innerWidth],
  );

  return (
    <Root className={isDesktop ? 'desktop' : ''}>
      <section className="slider">
        <div className="background">
          <Image
            id="logo-group"
            alt="주회 관악구 주관 관악문화재단 관악미술협회 기술 온디스플레이"
            src="/images/logo/logo-group.gif"
            width={1000}
            height={349}
            priority
          />
        </div>
        <div className="title-block">
          <div className="top">
            <Image
              id="title-image"
              alt="2020 관악강감찬 (11.06 ~ 11.13) 온라인 미술공모전"
              src="/images/title.png"
              width={680}
              height={565}
            />
            <h2 className="title">수상작 전시</h2>
          </div>
          <IconButton
            id="go-down-button"
            onClick={() =>
              window.scroll({ top: innerHeight, left: 0, behavior: 'smooth' })
            }>
            <ArrowDown />
          </IconButton>
        </div>
      </section>
      <section className="intro" />
      <section className="gallery">
        <h2 className="title">수상작 갤러리</h2>
        {['adult', 'middle', 'elementary'].map((division) => (
          <div key={`division-${division}`} id={division} className="division">
            <h3 className="division-title">{getDivisionKor(division)}</h3>
            {['최우수', '우수', '장려'].map((award) => (
              <div key={`award-${award}`} className="award-group">
                <h4>{award}상</h4>
                <div className="list-container">
                  {artworks
                    .filter(
                      (artwork) =>
                        artwork.division === division &&
                        artwork.award === award,
                    )
                    .map((artwork) => (
                      <ArtworkListItem
                        key={artwork.id}
                        artwork={artwork}
                        size={getPhotoSize()}
                        infoHeight={infoHeight}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
      <section className="ack">
        <h2 className="title">2020 관악강감찬 온라인 미술공모전 수상작 전시</h2>
        <div className="division">
          <p>장소</p>
          ggc2020.ondisplay.co.kr
        </div>
        <div className="division">
          <p>기간</p>
          2020.11.06 ~ 11.13
        </div>
        <div className="divider" />
      </section>
      <Footer />
    </Root>
  );
};

export default IndexPage;
