import { useEffect, useState } from "react";
import { getComments } from "../api/api";
import styles from "./Comments.module.css";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Comment from "./Comment";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    getComments(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  if (isError) return <NotFound />;
  if (isLoading) return <Loading />;

  return (
    <section className={styles.comments}>
      <h3>Comments</h3>

      <button
        className={styles.showCommentsButton}
        onClick={() => {
          setShowComments((curr) => !curr);
        }}
      >
        {showComments ? "Hide" : "Show"} comments
      </button>

      {showComments ? (
        <ul>
          {comments.map(({ comment_id, author, body, votes }) => {
            return (
              <Comment
                key={comment_id}
                comment_id={comment_id}
                author={author}
                body={body}
                votes={votes}
              />
            );
          })}
        </ul>
      ) : null}
    </section>
  );
};

export default Comments;
