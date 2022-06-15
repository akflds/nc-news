import { useState } from "react";
import styles from "./NewComment.module.css";
import NewCommentForm from "./NewCommentForm";

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
      {showPostCommentForm ? <NewCommentForm /> : null}
    </section>
  );
};

export default NewComment;
