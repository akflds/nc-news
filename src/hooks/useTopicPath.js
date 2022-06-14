import { matchPath } from "react-router";
import { useLocation } from "react-router-dom";

// used to inform components that sit outside <Routes> of their topic
const useTopicPath = (path) => {
  const { pathname } = useLocation();
  const match = matchPath({ path }, pathname);
  return match?.params || {};
};

export default useTopicPath;
