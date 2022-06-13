import { useState, useEffect } from "react";

import ArticleCard from "./ArticleCard";

import { getArticles } from "../api/api";

import styles from "./Articles.module.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section>
      <h2>Latest articles</h2>
      <div className={styles.articlesContainer}>
        {articles.map(({ article_id, title }) => {
          return <ArticleCard key={article_id} title={title} />;
        })}
      </div>
    </section>
  );
};

export default Articles;
