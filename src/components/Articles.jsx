import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useSortPath from "../hooks/useSortPath";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import { getArticles } from "../api/api";

import NotFound from "./NotFound";
import ArticleListControls from "./ArticleListControls";

import styles from "./Articles.module.css";

const Articles = () => {
  const { topic, sort } = useParams();
  const { sort_by, order } = useSortPath(sort);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = `NC News${topic ? `: ${topic}` : ""}`;
  }, [topic]);

  useEffect(() => {
    setIsError(false);
    setArticles([]);
  }, [topic, sort]);

  useEffect(() => {
    getArticles(topic, sort_by, order)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.msg);
        setIsError(true);
        setIsLoading(false);
      });
  }, [topic, sort_by, order]);

  if (isError) return <NotFound errorMessage={errorMessage} />;
  if (topic && isLoading) return <Loading />;

  return (
    <section className={styles.articles}>
      <h2>Articles</h2>
      <ArticleListControls />
      <div className={styles.articleList}>
        {articles.map(
          ({
            article_id,
            title,
            topic,
            author,
            votes,
            comment_count,
            created_at,
          }) => {
            return (
              <ArticleCard
                key={uuidv4()}
                article_id={article_id}
                title={title}
                topic={topic}
                author={author}
                votes={votes}
                comment_count={comment_count}
                isLoading={isLoading}
                created_at={created_at}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default Articles;
