import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api/api";

import { UserContext } from "../contexts/User";

import styles from "./NewCommentForm.module.css";

const NewCommentForm = () => {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const { article_id } = useParams();
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPosting(true);
    setIsError(false);
    postComment(article_id, user, newComment)
      .then(() => {
        // TODO: destructure comment and append to front of comment list? requires setComments being drilled a few levels...
        setPosted(true);
        setPosting(false);
        setNewComment("");
      })
      .catch((error) => {
        setPosting(false);
        setIsError(true);
      });
  };
  return (
    <>
      {isError ? (
        <div className={styles.commentError}>
          <p>Oops! We couldn't post that right now. Please try again...</p>
        </div>
      ) : null}
      {posted ? (
        <div className={styles.commentPosted}>
          <p>Comment posted!</p>
          <button className={styles.postAgain} onClick={() => setPosted(false)}>
            Post another comment
          </button>
        </div>
      ) : (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <label className={styles.commentLabel}>
            Your comment:
            <textarea
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                setIsError(false);
              }}
              placeholder="Tell me what you're thinking..."
            ></textarea>
          </label>
          <input
            className={styles.submit}
            disabled={posting || newComment.length === 0}
            type="submit"
            value={posting ? "Posting..." : "Post comment"}
          />
        </form>
      )}
    </>
  );
};

export default NewCommentForm;
