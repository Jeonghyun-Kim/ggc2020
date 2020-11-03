import { useState, useEffect } from 'react';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
}

const useWindowSize: () => WindowSize = () => {
  const [size, setSize] = useState<WindowSize>({
    innerWidth: 0,
    innerHeight: 0,
  });

  useEffect(() => {
    const handler = () => {
      const { innerWidth, innerHeight } = window;
      setSize({ innerWidth, innerHeight });
    };
    window.addEventListener('resize', handler, {
      capture: false,
      passive: true,
    });
    handler();

    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
};

export default useWindowSize;
