import React from 'react';
import { useRouter } from 'next/router';
import { useSprings } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
// import ImportContacts from '@material-ui/icons/ImportContacts';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ArrowLeft, ArrowRight, ArrowUp } from '../Icons/Arrow';
import { Award1, Award2, Award3 } from '../Icons/Award';
import Photo from './Photo';
import Gradient from '../Gradient';
import Profile from './Profile';
// import { EdgeModal } from '../Modal';
import Loading from '../Loading';

import { MobileRoot, DesktopRoot } from './styles';

import usePrevious from '../../lib/usePrevious';

import AppContext from '../../AppContext';

const zoomScales = [1, 2];

interface props {
  artworks: Artwork[];
  pageIndex: number;
  innerWidth: number;
}
const Slider: React.FC<props> = ({
  artworks,
  pageIndex,
  innerWidth,
  ...props
}) => {
  const router = useRouter();
  const { setIndex } = React.useContext(AppContext);
  const index = React.useRef<number>(pageIndex);
  const pinchFlag = React.useRef<boolean>(false);
  const [zoomIn, setZoomIn] = React.useState<number>(0);
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
  const previousProfileOpen = usePrevious(profileOpen);
  // const [edgeModalFlag, setEdgeModalFlag] = React.useState<boolean>(false);
  const [springs, setSprings] = useSprings(
    artworks.length,
    (i) => ({
      x: (i - index.current) * innerWidth,
      scale: 1,
      zIndex: i === index.current ? 1 : 0,
      display: 'block',
      config: { tension: 500, friction: 50 },
    }),
    [innerWidth],
  );

  const moveSprings = React.useCallback(() => {
    setSprings((i) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const x = (i - index.current) * innerWidth;
      if (i === index.current)
        return { x, scale: 1, zIndex: 1, display: 'block' };
      return { x, scale: 1, zIndex: 0, display: 'block' };
    });
  }, [innerWidth, setSprings]);

  const handleRight = React.useCallback(async () => {
    if (index.current < artworks.length - 1) {
      if (profileOpen) setProfileOpen(false);
      if (zoomIn) {
        setZoomIn(0);
        await new Promise((resolve) => setTimeout(() => resolve(), 300));
      }
      index.current += 1;
      setIndex(index.current + 1);
      moveSprings();
    } else if (index.current === artworks.length - 1) {
      // setEdgeModalFlag(true);
    }
  }, [profileOpen, zoomIn, artworks.length, setIndex, moveSprings]);

  const handleLeft = React.useCallback(async () => {
    if (index.current > 0) {
      if (profileOpen) setProfileOpen(false);
      if (zoomIn) {
        setZoomIn(0);
        await new Promise((resolve) => setTimeout(() => resolve(), 300));
      }
      index.current -= 1;
      setIndex(index.current + 1);
      moveSprings();
    }
  }, [profileOpen, zoomIn, setIndex, moveSprings]);

  // const handleGoTo = React.useCallback(
  //   (photoId: number) => {
  //     index.current = photoId - 1;
  //     setIndex(photoId);
  //     if (innerWidth < 900) moveSprings();
  //   },
  //   [moveSprings, setIndex, innerWidth],
  // );

  const bind = useGesture({
    onDrag: ({
      last,
      touches,
      down,
      offset: [x],
      lastOffset: [lastX],
      velocities: [vx],
      cancel,
      swipe: [, sy],
    }) => {
      if (sy === -1) {
        setProfileOpen(true);
        if (cancel) cancel();
      }
      if (touches > 1 || zoomIn) {
        if (cancel) cancel();
      } else {
        const deltaX = x - lastX;
        setSprings((i) => {
          if (i < index.current - 1 || i > index.current + 1)
            return { display: 'none' };
          const xT = (i - index.current) * innerWidth + (down ? deltaX : 0);
          const scale =
            down && touches === 1 ? 1 - Math.abs(deltaX) / innerWidth / 10 : 1;
          if (i === index.current)
            return { x: xT, scale, zIndex: 1, display: 'block' };
          return { x: xT, scale, zIndex: 0, display: 'block' };
        });
        if (last && (Math.abs(deltaX) > innerWidth / 3 || Math.abs(vx) > 1)) {
          if (deltaX < 0) handleRight();
          else handleLeft();
        }
      }
    },
    onPinch: ({ first, last, da: [d], vdva: [vd], cancel }) => {
      if (first) pinchFlag.current = true;
      if (last) pinchFlag.current = false;
      if (
        pinchFlag.current &&
        zoomIn < zoomScales.length - 1 &&
        vd > 0.3 &&
        (d > 100 || vd > 1)
      ) {
        pinchFlag.current = false;
        setZoomIn(zoomIn + 1);
        if (cancel) cancel();
      } else if (pinchFlag.current && zoomIn > 0 && vd < 0) {
        pinchFlag.current = false;
        setZoomIn(0);
        if (cancel) cancel();
      }
    },
    onClick: () => {
      if (profileOpen) setProfileOpen(false);
    },
    onDoubleClick: () => {
      setZoomIn(zoomIn ? 0 : 1);
    },
  });

  React.useEffect(() => {
    const handler = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', handler, { passive: false });
    return () => document.removeEventListener('touchstart', handler);
  }, []);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // if (!edgeModalFlag) handleRight();
        handleRight();
      }
      if (e.key === 'ArrowLeft') {
        // if (!edgeModalFlag) handleLeft();
        handleLeft();
      }
      if (e.key === 'Escape') {
        // if (profileOpen || edgeModalFlag) {
        if (profileOpen) {
          setProfileOpen(false);
          // setEdgeModalFlag(false);
        } else {
          router.back();
        }
      }
      if (e.key === 'P' || e.key === 'p') {
        // if (!edgeModalFlag) setProfileOpen(!profileOpen);
        setProfileOpen(!profileOpen);
      }
      if (e.key === ' ') {
        e.preventDefault();
        // if (!edgeModalFlag) setZoomIn(zoomIn ? 0 : 1);
        setZoomIn(zoomIn ? 0 : 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleLeft, handleRight, router, profileOpen, zoomIn]);

  const Award: React.FC<{ i: number }> = React.useCallback(
    ({ i }) => {
      if (artworks[i].award === '최우수') return <Award1 />;
      if (artworks[i].award === '우수') return <Award2 />;
      return <Award3 />;
    },
    [artworks],
  );

  const CloseButton: React.FC = React.useCallback(
    () => (
      <IconButton
        className="close-button"
        onClick={() => {
          router.back();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') router.back();
        }}>
        <CloseIcon />
      </IconButton>
    ),
    [router],
  );

  const ArtistInfo: React.FC<{
    i: number;
    children?: React.ReactNode;
  }> = React.useCallback(
    ({ i, children }) => (
      <div className="artist-info">
        <div
          className="click-area"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            setProfileOpen(!profileOpen);
            e.currentTarget.blur();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setProfileOpen(!profileOpen);
              e.currentTarget.blur();
            }
          }}>
          <div className="icon-block">
            <Award i={i} />
          </div>
          <div className="vertical-divider" />
          <div className="title-and-name">
            <h2 className="title">{artworks[i].title}</h2>
            <p className="artist-name">
              {artworks[i].prefix ? `${artworks[i].prefix} ` : ''}
              {artworks[i].name}
            </p>
            {innerWidth < 900 && (
              <div className="see-more-button">
                더보기 <ArrowUp />
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    ),
    [artworks, profileOpen, innerWidth],
  );

  const ZoomInButton: React.FC = React.useCallback(
    () => (
      <div className="zoom-in-button">
        <div
          className="icon-block"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            setZoomIn(zoomIn ? 0 : 1);
            e.currentTarget.blur();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setZoomIn(zoomIn ? 0 : 1);
              e.currentTarget.blur();
            }
          }}>
          {zoomIn ? <ZoomOutIcon /> : <ZoomInIcon />}
          <span className="icon-name">{zoomIn ? '축소' : '확대'}</span>
        </div>
      </div>
    ),
    [zoomIn],
  );

  // const MessageButton: React.FC = React.useCallback(
  //   () => (
  //     <Link href="/visitor">
  //       <div className="message-button">
  //         <div
  //           className="icon-block"
  //           role="button"
  //           tabIndex={0}
  //           onKeyDown={(e) => {
  //             if (e.key === 'Enter') {
  //               router.push('/visitor');
  //               e.currentTarget.blur();
  //             }
  //           }}>
  //           <ImportContacts />
  //           <span className="icon-name">방명록</span>
  //         </div>
  //       </div>
  //     </Link>
  //   ),
  //   [router],
  // );

  const Gradients: React.FC = React.useCallback(
    () => (
      <>
        {/* <Gradient
          size={{ width: '100%', height: '70px' }}
          position={{ top: '0', left: '0' }}
          opacities={{ start: 0, end: 0.1 }}
          vertical
        /> */}
        <Gradient
          className="bottom"
          size={{ width: '100%', height: '80px' }}
          position={{ bottom: '0', left: '0' }}
          opacities={{ start: 0.5, end: 0 }}
          vertical
        />
      </>
    ),
    [],
  );

  const Arrows: React.FC = React.useCallback(
    () => (
      <>
        <IconButton className="arrow-button left" onClick={() => handleLeft()}>
          <SvgIcon component={ArrowLeft} viewBox="6 6 12 12" />
        </IconButton>
        <IconButton
          className="arrow-button right"
          onClick={() => handleRight()}>
          <SvgIcon component={ArrowRight} viewBox="6 6 12 12" />
        </IconButton>
      </>
    ),
    [handleLeft, handleRight],
  );

  return (
    <>
      {/* <EdgeModal open={edgeModalFlag} /> */}
      {innerWidth < 900 ? (
        <React.Suspense fallback={Loading}>
          <MobileRoot className="unselectable" {...props}>
            <>
              {springs.map(({ x, display, scale, zIndex }, i) => (
                <a.div
                  className="slider-page"
                  {...bind()}
                  key={`background-${artworks[i].id}`}
                  style={{
                    x,
                    display: display as never,
                    zIndex: zIndex as never,
                  }}>
                  <a.div style={{ scale }}>
                    <Photo
                      title={artworks[i].title}
                      src={`/images/artworks/${artworks[i].id}.${
                        !i ? 'gif' : 'jpg'
                      }`}
                      zoomScales={zoomScales}
                      zoomIn={zoomIn}
                      round={!index.current}
                    />
                    <Gradients />
                    <CloseButton />
                    <ArtistInfo i={i} />
                    {/* <MessageButton /> */}
                    <ZoomInButton />
                  </a.div>
                </a.div>
              ))}
              <Profile
                open={profileOpen}
                previous={previousProfileOpen}
                close={() => setProfileOpen(false)}
                artwork={artworks[index.current]}
              />
            </>
          </MobileRoot>
        </React.Suspense>
      ) : (
        <DesktopRoot className="unselectable" {...props}>
          <Photo
            title={artworks[index.current].title}
            src={`/images/artworks/${artworks[index.current].id}.${
              !index.current ? 'gif' : 'jpg'
            }`}
            zoomScales={zoomScales}
            zoomIn={zoomIn}
            round={!index.current}
          />
          <CloseButton />
          <Arrows />
          <IconButton onClick={() => setProfileOpen(true)}>
            <ArrowUp color="#515253" />
          </IconButton>
          <ArtistInfo i={index.current}>
            <Profile
              open={profileOpen}
              previous={previousProfileOpen}
              close={() => setProfileOpen(false)}
              artwork={artworks[index.current]}
            />
          </ArtistInfo>
          <ZoomInButton />
        </DesktopRoot>
      )}
    </>
  );
};

export default Slider;
