import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isTablet = screenSize.width <= 1024 && screenSize.height <= 768 || screenSize.width <= 768 && screenSize.height <= 1024;

  console.log("screeeee", screenSize)

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
