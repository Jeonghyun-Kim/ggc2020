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
    .award-info {
      font-weight: 700;
    }
    .artwork-description {
      margin: 30px 0;
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
  const { innerWidth } = useWindowSize();
  const maxHeight = React.useMemo(() => (innerWidth < 900 ? 350 : 400), [
    innerWidth,
  ]);
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
        <p className="award-info">
          {getDivisionKor(artwork.division)} {artwork.award}
        </p>
        <h4 className="artist-name">
          {artwork.prefix ? `${artwork.prefix} ` : ''}
          {artwork.name}
        </h4>
        <p className="artwork-title">{artwork.title}</p>
        {artwork.size && <p className="artwork-size">{artwork.size} cm</p>}
        <p className="artwork-material">{artwork.material}</p>
        <p className="artwork-description">{artwork.description}</p>
      </div>
    </Root>
  );
};

export default Profile;
