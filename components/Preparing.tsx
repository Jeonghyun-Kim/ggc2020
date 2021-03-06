import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  .preparing {
    position: relative;
    width: 404px;
    height: 404px;
    max-width: min(80vw, 80vh);
    max-height: min(80vw, 80vh);
    & > * {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  #preparing-text {
    animation: infinite-spinning 20s linear infinite;
  }
  @keyframes infinite-spinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface Props {
  end?: boolean;
}
const Preparing: React.FC<Props> = ({ end = false }) => {
  return (
    <Root>
      <div className="preparing">
        <Image
          src="/images/ganggamchan.png"
          alt="Character General Ganggamchan"
          width={702}
          height={702}
        />
        <Image
          id="preparing-text"
          src={end ? '/images/ending-text.png' : '/images/preparing-text.png'}
          alt={end ? '전시 종료' : '전시 준비 중 전시기간 2020.11.06 ~ 11.13'}
          width={702}
          height={702}
        />
      </div>
    </Root>
  );
};

export default Preparing;
