import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api/api";

const NewCommentForm = () => {
  const [newComment, setNewComment] = useState("");
  const { article_id } = useParams();
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPosting(true);
    postComment(article_id, newComment)
      .then(() => {
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
      {posted ? (
        <>
          <p>Comment posted!</p>
          <button onClick={() => setPosted(false)}>Post another comment</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Comment:
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tell me what you're thinking..."
            ></textarea>
          </label>
          <input
            disabled={posting}
            type="submit"
            value={posting ? "Posting..." : "Submit"}
          />
        </form>
      )}
    </>
  );
};

export default NewCommentForm;
