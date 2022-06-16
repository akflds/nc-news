import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useSortPath from "../hooks/useSortPath";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import { getArticles } from "../api/api";

import styles from "./Articles.module.css";
import NotFound from "./NotFound";
import ArticleListControls from "./ArticleListControls";

const Articles = () => {
  const { topic, sort } = useParams();
  const { sort_by, order } = useSortPath(sort);

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    document.title = `NC News${topic ? `: ${topic}` : ""}`;
  }, [topic]);

  useEffect(() => {
    setIsError(false);
  }, [topic]);

  useEffect(() => {
    getArticles(topic, sort_by, order)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [topic, sort_by, order]);

  if (isError) return <NotFound />;
  if (topic && isLoading) return <Loading />;

  // TODO: Add pagination/"show more" for articles
  return (
    <section className={styles.articles}>
      <h2>Articles</h2>
      <ArticleListControls />
      <div className={styles.articleList}>
        {articles.map(
          ({ article_id, title, topic, author, votes, comment_count }) => {
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
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default Articles;
