import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ArticleCard from "./ArticleCard";

import { getArticles } from "../api/api";

import styles from "./Articles.module.css";

const Articles = () => {
  const { topic } = useParams();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(topic)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className={styles.articles}>
      <h2>Latest articles</h2>
      <div className={styles.articleList}>
        {articles.map(
          ({ article_id, title, topic, author, votes, comment_count }) => {
            return (
              <ArticleCard
                key={article_id}
                title={title}
                topic={topic}
                author={author}
                votes={votes}
                comment_count={comment_count}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default Articles;
