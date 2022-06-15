import styles from "./Comment.module.css";

import Vote from "./Vote";
const Comment = ({ comment_id, author, body, votes }) => {
  return (
    <li className={styles.commentContainer}>
      <p>
        <span className={styles.author}>{author}</span> posted:
      </p>
      <p>{body}</p>
      <Vote comment_id={comment_id} votes={votes} />
    </li>
  );
};

export default Comment;
