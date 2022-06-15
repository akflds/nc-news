import { useState } from "react";
import { useParams } from "react-router-dom";

const NewCommentForm = () => {
  const [newComment, setNewComment] = useState("");
  const { article_id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newComment);
    // todo api call
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tell me what you're thinking..."
        ></textarea>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewCommentForm;
