import styles from "./Comment.module.css";
import { UserContext } from "../contexts/User";
import { useContext, useState } from "react";
import { deleteComment } from "../api/api";

import Vote from "./Vote";

const Comment = ({ comment_id, author, body, votes, setComments }) => {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    deleteComment(comment_id)
      .then(() => {
        setDeleted(true);
      })
      .catch((error) => {
        setIsDeleting(false);
      });
  };

  if (deleted) {
    setTimeout(() => {
      setComments((curr) => {
        return curr.filter((comment) => comment.comment_id !== comment_id);
      });
    }, 1200);
    return <p className={styles.deleted}>Comment deleted!</p>;
  }

  return (
    <li className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <p>
          <span className={styles.author}>{author}</span> posted:
        </p>
        {user.name === author ? (
          <button
            disabled={isDeleting}
            className={styles.deleteCommentButton}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        ) : null}
      </div>

      <p>{body}</p>
      <Vote comment_id={comment_id} votes={votes} />
    </li>
  );
};

export default Comment;
