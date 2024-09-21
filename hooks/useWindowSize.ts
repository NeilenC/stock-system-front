import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Función para actualizar el tamaño de la ventana
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Añadir un event listener para detectar cambios de tamaño
    window.addEventListener('resize', handleResize);

    // Ejecutar la función de inmediato para registrar el tamaño inicial
    handleResize();

    // Limpiar el event listener cuando el componente se desmonte
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;