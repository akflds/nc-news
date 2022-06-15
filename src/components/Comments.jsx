import { useEffect, useState } from "react";
import { getComments } from "../api/api";
import styles from "./Comments.module.css";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        console.log(fetchedComments);
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
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <p>Comment by: {comment.author}</p>
              <p>{comment.body}</p>
              <p>Votes: {comment.votes}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
