import { matchPath } from "react-router";
import { useLocation } from "react-router-dom";

const useTopicPath = (path) => {
  const { pathname } = useLocation();
  const match = matchPath({ path }, pathname);
  return match?.params || {};
};

export default useTopicPath;
