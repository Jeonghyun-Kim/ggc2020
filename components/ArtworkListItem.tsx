import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useWindowSize from '../lib/useWindowSize';

import AppContext from '../AppContext';

interface RootProps {
  size: number;
  infoHeight: number;
}
const Root = styled.div<RootProps>`
  width: ${(props) => props.size}px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .artwork-list-item-img {
    width: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
  .caption-block {
    width: 100%;
    height: ${(props) => props.infoHeight}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      width: 100%;
      font-size: 0.875rem;
      font-weight: 400;
      text-align: center;
      margin: 0;
      margin-top: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      font-size: 0.75rem;
      font-weight: 400;
      margin: 0;
      span {
        font-weight: 500;
      }
    }
  }
  &.desktop {
    .caption-block {
      h4 {
        font-size: 1.25rem;
        font-weight: 500;
      }
      p {
        font-size: 1rem;
      }
    }
  }
`;

interface props {
  artwork: Artwork;
  size: number;
  infoHeight: number;
}
const ArtworkListItem: React.FC<props> = ({
  artwork,
  size,
  infoHeight,
  ...props
}) => {
  const router = useRouter();
  const { setIndex, index } = React.useContext(AppContext);
  const { innerWidth } = useWindowSize();

  const handleMove = React.useCallback(() => {
    setIndex(artwork.id);
    router.push('/ovr');
  }, [artwork.id, router, setIndex]);

  return (
    <Root
      id={`artwork-list-item-${artwork.id}`}
      className={`item ${innerWidth >= 900 ? 'desktop' : 'mobile'}`}
      size={size}
      infoHeight={infoHeight}
      role="button"
      tabIndex={0}
      onClick={() => handleMove()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleMove();
      }}
      {...props}>
      <Image
        className="artwork-list-item-img unselectable"
        alt={artwork.title}
        src={`/images/artworks/thumb/${artwork.id}.jpg`}
        width={size}
        height={size}
        priority={Math.abs(artwork.id - index) < 4}
      />
      <div className="caption-block">
        <h4>{artwork.title}</h4>
        <p>{artwork.name}</p>
      </div>
    </Root>
  );
};

export default ArtworkListItem;
