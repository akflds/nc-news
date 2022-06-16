import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.css";

const ArticleCard = ({
  article_id,
  title,
  author,
  topic,
  votes,
  comment_count,
  isLoading,
}) => {
  // TODO: Improve layout of this component, include date?
  return (
    <article
      className={`${styles.articleCard} ${
        isLoading ? `${styles.loading}` : ""
      }`}
    >
      <Link
        className={`${isLoading ? `${styles.loading}` : ""}`}
        to={`/topic/${topic}/article/${article_id}`}
      >
        <h3>{title}</h3>
      </Link>
      <div className={styles.articleInfo}>
        <p>
          Posted by {author} in <span className={styles.topic}>{topic}</span>
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
