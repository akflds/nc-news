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
  const [page, setPage] = useState(0);
  const [loadedAllComments, setLoadedAllComments] = useState(false);

  // preloads initial comments behind button
  useEffect(() => {
    getComments(article_id, page)
      .then((fetchedComments) => {
        if (fetchedComments.length === 0) {
          setLoadedAllComments(true);
        }
        // handles the initial double render as page is set
        setComments((curr) => {
          if (JSON.stringify(curr) !== JSON.stringify(fetchedComments)) {
            return [...curr, ...fetchedComments];
          }
          return curr;
        });

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id, page]);

  if (isError) return <NotFound />;
  if (isLoading) return <Loading />;

  return (
    <section className={styles.comments}>
      <h3>Comments</h3>

      <button
        className={`${styles.showCommentsButton} ${
          showComments ? `${styles.clicked}` : ""
        }`}
        onClick={() => {
          setShowComments((curr) => !curr);
        }}
      >
        {showComments ? "Hide" : "Show"} comments
      </button>

      {showComments ? (
        <>
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
          {!loadedAllComments ? (
            <button
              className={styles.showMoreButton}
              onClick={() => {
                setPage((curr) => curr + 1);
              }}
            >
              See more
            </button>
          ) : (
            <p className={styles.theEnd}>
              {comments.length ? "You reached the end!" : "No comments... yet!"}
            </p>
          )}
        </>
      ) : null}
    </section>
  );
};

export default Comments;
