import Vote from "./Vote";
const Comment = ({ comment_id, author, body, votes }) => {
  return (
    <li>
      <p>Comment by: {author}</p>
      <p>{body}</p>
      <Vote comment_id={comment_id} votes={votes} />
    </li>
  );
};

export default Comment;
