import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ArticleCard from "./ArticleCard";

import { getArticles } from "../api/api";

import styles from "./Articles.module.css";
import NotFound from "./NotFound";

const Articles = () => {
  const { topic } = useParams();

  const [articles, setArticles] = useState(Array(10).fill({}));
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [topic]);

  useEffect(() => {
    getArticles(topic)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, [topic]);

  if (isError) return <NotFound />;
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
