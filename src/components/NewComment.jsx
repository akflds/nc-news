import { useState } from "react";
import styles from "./NewComment.module.css";

const NewComment = () => {
  const [showPostCommentForm, setShowPostCommentForm] = useState(false);
  return (
    <section>
      <button
        className={`${styles.showPostCommentFormButton} ${
          showPostCommentForm ? `${styles.clicked}` : ""
        }`}
        onClick={() => setShowPostCommentForm((curr) => !curr)}
      >
        {showPostCommentForm ? "Hide new comment" : "New comment"}
      </button>
      {showPostCommentForm ? <h3>Comments go here</h3> : null}
    </section>
  );
};

export default NewComment;
