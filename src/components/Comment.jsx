import styles from "./Comment.module.css";
import { UserContext } from "../contexts/User";
import { useContext } from "react";

import Vote from "./Vote";

const Comment = ({ comment_id, author, body, votes }) => {
  const { user } = useContext(UserContext);

  return (
    <li className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <p>
          <span className={styles.author}>{author}</span> posted:
        </p>
        {user.name === author ? <button>Delete</button> : null}
      </div>

      <p>{body}</p>
      <Vote comment_id={comment_id} votes={votes} />
    </li>
  );
};

export default Comment;
