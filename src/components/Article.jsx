import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api/api";
import styles from "./Article.module.css";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Article = () => {
  const [article, setArticle] = useState({});
  const { topic, article_id } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticle(article_id).then((fetchedArticle) => {
      setArticle(fetchedArticle);
      setIsLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    setIsError(topic !== article.topic);
  }, [topic, article]);

  if (isLoading) return <Loading />;
  if (isError) return <NotFound />;
  return (
    <section className={styles.articleContainer}>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
    </section>
  );
};

export default Article;
