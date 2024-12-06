import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const isTablet = screenSize.width <= 1024 && screenSize.height <= 768 || screenSize.width <= 836 && screenSize.height <= 1120;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { screenSize, isTablet };
};

export default useScreenSize;
