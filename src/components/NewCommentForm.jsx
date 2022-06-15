import { useParams } from "react-router-dom";

const NewCommentForm = () => {
  const { article_id } = useParams();
  return <p>Formy McFormface</p>;
};

export default NewCommentForm;
