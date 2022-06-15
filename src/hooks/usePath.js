import { useLocation, useMatch } from "react-router-dom";

// used to inform components that sit outside <Routes> of their topic
const usePath = () => {
  const { pathname } = useLocation();
  const match = useMatch("/topic/:topic/*", pathname);
  return match ? match.params : {};
};

export default usePath;
