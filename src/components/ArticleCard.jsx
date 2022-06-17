import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.css";
import { UserContext } from "../contexts/User";
import { useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ArticleCard = ({
  article_id,
  title,
  author,
  topic,
  votes,
  comment_count,
  isLoading,
  created_at,
}) => {
  const { user } = useContext(UserContext);

  return (
    <article
      className={`${styles.articleCard} ${
        isLoading ? `${styles.loading}` : ""
      }`}
    >
      <h3>
        <Link
          className={`${isLoading ? `${styles.loading}` : ""}`}
          to={`/topic/${topic}/article/${article_id}`}
        >
          {title}
        </Link>
      </h3>
      <div className={styles.articleInfo}>
        <p>
          <strong>{user.name === author ? "You" : author}</strong> posted{" "}
          <strong>{dayjs().to(dayjs(created_at))}</strong> in{" "}
          <strong>{topic}</strong>
        </p>
      </div>
      <div className={styles.articleStats}>
        <p>{votes} votes</p>
        <p>{comment_count} comments</p>
      </div>
    </article>
  );
};

export default ArticleCard;
