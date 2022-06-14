import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api/api";
import styles from "./Article.module.css";

const Article = () => {
  const [article, setArticle] = useState({});
  const { topic, article_id } = useParams();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticle(article_id).then((fetchedArticle) => {
      setArticle(fetchedArticle);
    });
  }, [article_id]);

  useEffect(() => {
    setIsError(topic !== article.topic);
  }, [topic, article_id]);

  if (isError) return <p>Article not found!</p>;
  return (
    <section className={styles.articleContainer}>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
    </section>
  );
};

export default Article;
