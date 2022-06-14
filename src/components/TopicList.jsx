import { Link } from "react-router-dom";

import styles from "./TopicList.module.css";
const TopicList = ({ topics }) => {
  return (
    <div className={styles.topicList}>
      <h2>Topics</h2>
      <ul className={styles.topicsList}>
        {topics.map(({ slug }) => {
          return (
            <Link key={slug} to={`/${slug}`}>
              <li>{slug}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default TopicList;
