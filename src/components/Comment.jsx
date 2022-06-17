import styles from "./Comment.module.css";
import { UserContext } from "../contexts/User";
import { useContext, useState } from "react";
import { deleteComment } from "../api/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Vote from "./Vote";

dayjs.extend(relativeTime);

const Comment = ({
  comment_id,
  author,
  body,
  votes,
  setComments,
  created_at,
}) => {
  const { user } = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(false);
    setIsDeleting(true);
    deleteComment(comment_id)
      .then(() => {
        setDeleted(true);
      })
      .catch((error) => {
        setIsDeleting(false);
      });
  };

  const handleConfirm = () => {
    setConfirmDelete(true);
    setTimeout(() => setConfirmDelete(false), 2000);
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
          <span className={styles.author}>{author}</span>,{" "}
          {dayjs().to(dayjs(created_at))} commented:
        </p>
        {user.name === author ? (
          confirmDelete ? (
            <button
              className={styles.confirmDeleteButton}
              onClick={handleDelete}
            >
              Confirm Delete?
            </button>
          ) : (
            <button
              disabled={isDeleting}
              className={styles.deleteCommentButton}
              onClick={handleConfirm}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )
        ) : null}
      </div>

      <p>{body}</p>
      <Vote comment_id={comment_id} votes={votes} author={author} />
    </li>
  );
};

export default Comment;
