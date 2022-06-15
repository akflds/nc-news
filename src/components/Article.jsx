import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api/api";
import styles from "./Article.module.css";
import Comments from "./Comments";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Vote from "./Vote";

const Article = () => {
  const [article, setArticle] = useState({});
  const { topic, article_id } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticle(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  useEffect(() => {
    setIsError(topic !== article.topic);
  }, [topic, article]);

  // TODO: consider replaceing isLoading pattern with loading panel as in other components
  if (isLoading) return <Loading />;
  if (isError) return <NotFound />;
  return (
    <div className={styles.articleContainer}>
      <article className={styles.article}>
        <h2>{article.title}</h2>
        <div className={styles.articleVotes}>
          <Vote article_id={article_id} votes={article.votes} />
        </div>
        <p>{article.body}</p>
      </article>
      <Comments />
    </div>
  );
};

export default Article;
