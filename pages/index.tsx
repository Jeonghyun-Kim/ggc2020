import React from 'react';
import NextImage from 'next/image';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';

import { ArrowDown } from '../components/Icons/Arrow';
import {
  AwardGallery,
  Adult,
  Middle,
  Elementary,
} from '../components/Icons/Title';
import ArtworkListItem from '../components/ArtworkListItem';
import Footer from '../components/Footer';

import useWindowSize from '../lib/useWindowSize';
// import { getDivisionKor } from '../utils/division';

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
  .intro {
    max-width: 1100px;
    margin: 0 auto;
    .profile-block {
      padding: 48px ${PADDING.mobile}px;
      display: flex;
      .image-block {
        width: 128px;
      }
      .title-block {
        padding-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        h2,
        h3 {
          margin: 0;
        }
        h3 {
          font-size: 1.5625rem;
          font-weight: 700;
        }
        h2 {
          font-size: 1rem;
          font-weight: 700;
        }
      }
    }
    .content {
      padding: 0 ${PADDING.mobile}px;
      margin-bottom: 48px;
    }
  }
  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0;
    #award-title {
      max-width: min(60%, 350px);
      margin-bottom: 32px;
    }
    #adult-title,
    #middle-title,
    #elementary-title {
      margin: 4px 0;
      padding-left: ${PADDING.mobile}px;
      width: min(30%, 200px);
      height: auto;
    }
    .division {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      margin-bottom: 32px;
      .division-title-block {
        margin: 0 ${PADDING.mobile}px;
        background-color: #f7cd38;
      }
      .award-group {
        .award-title {
          margin: 8px 0;
          padding-left: ${PADDING.mobile}px;
        }
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
      max-width: 1100px;
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
    #logo-group {
      margin: 20px 0;
    }
    .divider {
      height: 1px;
      margin-top: 48px;
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
    .intro {
      padding-bottom: 80px;
      .profile-block {
        padding: 64px ${PADDING.desktop}px;
        .image-block {
          width: 180px;
        }
        .title-block {
          padding-left: 32px;
        }
        h3 {
          font-size: 2.5rem;
        }
        h2 {
          font-size: 1.25rem;
        }
      }
      .content {
        padding: 0 ${PADDING.desktop}px;
        font-size: 1.25rem;
      }
    }
    .gallery {
      #adult-title,
      #middle-title,
      #elementary-title {
        margin: 8px 0;
        padding-left: ${PADDING.desktop}px;
      }
      .division {
        .division-title-block {
          margin: 0 ${PADDING.desktop}px;
        }
        .award-group {
          .award-title {
            margin: 16px 0;
            padding-left: ${PADDING.desktop}px;
            font-size: 2rem;
            font-weight: 700;
          }
        }
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

  React.useEffect(() => {
    const backgroundImg = new Image();
    backgroundImg.src = '/images/background/original.jpg';
  }, []);

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
          <NextImage
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
            <NextImage
              id="title-image"
              alt="2020 관악강감찬 (11.06 ~ 11.13) 온라인 미술공모전"
              src="/images/title.png"
              width={680}
              height={565}
              priority
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
      <section className="intro">
        <div className="profile-block">
          <div className="image-block">
            <NextImage
              id="profile-image"
              src="/images/KCS.jpg"
              alt="김철성"
              width={500}
              height={749}
            />
          </div>
          <div className="title-block">
            <h3>안녕하십니까?</h3>
            <h2>관악미술협회 회장 김철성입니다.</h2>
          </div>
        </div>
        <div className="content">
          <p>
            ‘관악강감찬축제’의 하나로 강감찬 장군의 용맹한 정신과 지혜를 살려
            ‘관악 인 히어로-당신은 영웅입니다’를 미술로 표현하는 “2020관악강감찬
            온라인 미술공모전”에 관심을 가지고 출품해주신 여러분께 감사드립니다.
          </p>
          <p>
            관악구에서 탄생한 강감찬 장군은 위기에 처한 고려를 구해낸
            영웅입니다. 오늘날 전 세계가 코로나-19로 인해 큰 어려움에 처해
            있으나, 대한민국은 이러한 위기를 지혜롭게 잘 극복하고 있습니다.
            각자의 자리에서 위기를 극복하고 있는 여러분이 바로 강감찬 장군과
            같은 영웅입니다. 이번 “2020관악강감찬 온라인 미술공모전”에 출품한
            작품들 속에 잘 드러나 있습니다. 직접 낙성대 공원을 방문하여 강감찬
            장군의 동상을 보며 성실하게 사생한 그림, 코로나로 인해 밖에 나가지
            못하지만 가정에서 행복한 시간을 바라는 마음을 담은 그림, 방역수칙을
            잘 지키며 코로나를 물리치는 모습을 창의적으로 표현한 그림, 코로나를
            극복하기 위해 노력하는 의료진들의 모습을 감동적으로 그렸습니다.
            심사는 주제적합성, 창의성, 완성도를 중심으로 하였습니다. 우수한
            작품들이 많이 출품되어 제한된 작품만을 수상작으로 선정하는데 고심이
            많았습니다.
          </p>
          <p>
            수상작은 지상전과 온라인 전시로 진행됩니다. 금번 공모전이 코로나로
            지친 마음에 위로가 되길 소망합니다. 더불어 훌륭한 미술인이 많이
            탄생하기를 바랍니다. 우수한 작품으로 입상하신 수상자 여러분 진심으로
            축하드립니다.
          </p>
        </div>
      </section>
      <section className="gallery">
        {/* <h2 className="title">수상작 갤러리</h2> */}
        <AwardGallery />
        {['adult', 'middle', 'elementary'].map((division, idx) => (
          <div key={`division-${division}`} id={division} className="division">
            {/* <h3 className="division-title">{getDivisionKor(division)}</h3> */}
            <div className="division-title-block">
              {/* eslint-disable-next-line no-nested-ternary */}
              {idx === 0 ? <Adult /> : idx === 1 ? <Middle /> : <Elementary />}
            </div>
            {['최우수', '우수', '장려'].map((award) => (
              <div key={`award-${award}`} className="award-group">
                <h4 className="award-title">{award}상</h4>
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
        <NextImage
          id="logo-group"
          src="/images/logo/logo-group.png"
          alt="주최 관악구 주관 관악문화재단 관악미술협회"
          width={542}
          height={39}
        />
        <div className="divider" />
      </section>
      <Footer />
    </Root>
  );
};

export default IndexPage;
