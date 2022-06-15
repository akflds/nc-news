import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useSortPath from "../hooks/useSortPath";
import ArticleCard from "./ArticleCard";

import { getArticles } from "../api/api";

import styles from "./Articles.module.css";
import NotFound from "./NotFound";

const Articles = () => {
  const { topic, sort } = useParams();

  const [articles, setArticles] = useState(Array(10).fill({}));
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { sort_by, order } = useSortPath(sort);

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
      });
  }, [topic, sort_by, order]);

  if (isError) return <NotFound />;

  // TODO: Add pagination/"show more" for articles
  return (
    <section className={styles.articles}>
      <h2>Latest articles</h2>
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
