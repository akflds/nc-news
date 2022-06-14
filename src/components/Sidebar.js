import useTopicPath from "../hooks/useTopicPath";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { topic } = useTopicPath("/t/:topic");

  return (
    <div className={styles.sidebar}>
      <h2>{topic ? `Welcome to ${topic}` : `Topics`}</h2>
    </div>
  );
};

export default Sidebar;
