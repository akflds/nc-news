import { Link } from "react-router-dom";

import styles from "./TopicList.module.css";
const TopicList = ({ topics, isLoading }) => {
  return (
    <div className={styles.topicList}>
      <h2>Topics</h2>
      <ul className={styles.topicsList}>
        {topics.map(({ slug }) => {
          return (
            <li className={isLoading ? `${styles.loading}` : ""} key={slug}>
              <Link to={`/${slug}`}>{slug}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopicList;
