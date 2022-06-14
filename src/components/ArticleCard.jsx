import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.css";

const ArticleCard = ({
  article_id,
  title,
  author,
  topic,
  votes,
  comment_count,
}) => {
  return (
    <article className={styles.articleCard}>
      <Link to={`/t/${topic}/${article_id}`}>
        <h3>{title}</h3>
      </Link>
      <div className={styles.articleInfo}>
        <p>Author: {author}</p>
        <p>
          Posted under <span className={styles.topic}>{topic}</span>
        </p>
      </div>
      <div className={styles.articleStats}>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
      </div>
    </article>
  );
};

export default ArticleCard;
