import styles from "./ArticleCard.module.css";

const ArticleCard = ({ title, author, topic, votes, comment_count }) => {
  return (
    <article className={styles.articleCard}>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Posted in {topic}</p>
      <p>
        Votes: {votes}. Comments: {comment_count}
      </p>
    </article>
  );
};

export default ArticleCard;
