import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    height: undefined,
    width: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
