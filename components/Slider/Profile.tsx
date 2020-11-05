import React from 'react';
import styled from 'styled-components';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useWindowSize from '../../lib/useWindowSize';

import { getDivisionKor } from '../../utils/division';

const Root = styled(a.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: white;
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: column;
  z-index: 99;
  .container {
    position: relative;
    padding: 12px 8px;
    padding-top: 32px;
    p,
    h4 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 400;
    }
    .award-and-name {
      display: flex;
      margin-bottom: 20px;
      .award-info {
        font-size: 1rem;
        font-weight: 700;
      }
      .artist-name {
        font-size: 1rem;
        margin-left: 40px;
      }
    }
    .artwork-description {
      margin: 20px 0;
    }
  }
  .profile-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    background-color: #9e9e9e;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    padding: 0;
    z-index: 100;
    svg {
      font-size: 25px;
      color: white;
    }
  }
  &.desktop {
    bottom: 100%;
    background: #2a2b2c;
    border-radius: 5px;
    .profile-close-button {
      background-color: #515253;
    }
    .container {
      p,
      h4 {
        font-size: 1rem;
        color: white;
      }
      .award-and-name {
        margin-bottom: 24px;
        .award-info {
          font-size: 1.25rem;
        }
        .artist-name {
          font-size: 1.25rem;
          margin-left: 48px;
        }
      }
      .artwork-description {
        margin: 24px 0;
      }
    }
  }
`;

interface props {
  open: boolean;
  previous?: boolean;
  close: () => void;
  artwork: Artwork;
}
const Profile: React.FC<props> = ({
  open,
  previous,
  close,
  artwork,
  ...props
}) => {
  const { innerWidth, innerHeight } = useWindowSize();
  const maxHeight = React.useMemo(() => {
    if (innerWidth < 900) {
      if (innerWidth < innerHeight && innerHeight > 500) return 350;
      return 250;
    }
    return 400;
  }, [innerWidth, innerHeight]);
  const [{ height, y }, setSpring] = useSpring(
    () => ({
      height: previous ? maxHeight : 0,
      y: previous ? 0 : maxHeight + 30,
      config: { tension: 500, friction: 50 },
    }),
    [],
  );

  React.useEffect(() => {
    if (innerWidth < 900) setSpring({ y: open ? 0 : maxHeight + 30 });
    else setSpring({ height: open ? maxHeight : 0 });
  }, [innerWidth, open, setSpring, maxHeight]);

  return (
    <Root
      className={innerWidth >= 900 ? 'desktop' : ''}
      style={{
        height: innerWidth < 900 ? maxHeight : height,
        y: innerWidth < 900 ? y : 0,
      }}
      {...props}>
      <div className="container">
        <IconButton
          className="profile-close-button"
          onClick={async () => close()}>
          <CloseIcon />
        </IconButton>
        <div className="award-and-name">
          <p className="award-info">
            {getDivisionKor(artwork.division)} {artwork.award}
          </p>
          <h4 className="artist-name">
            {artwork.prefix ? `${artwork.prefix} ` : ''}
            {artwork.name}
          </h4>
        </div>
        <p className="artwork-title">{artwork.title}</p>
        {artwork.size && <p className="artwork-size">{artwork.size} cm</p>}
        <p className="artwork-material">{artwork.material}</p>
        <p className="artwork-description">{artwork.description}</p>
      </div>
    </Root>
  );
};

export default Profile;
