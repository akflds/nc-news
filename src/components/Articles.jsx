import { useState, useEffect } from "react";
import { getArticles } from "../api/api";

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
    <>
      <h2>Latest articles</h2>
      <ul>
        {articles.map(({ article_id, title }) => {
          return <li key={article_id}>{title}</li>;
        })}
      </ul>
    </>
  );
};

export default Articles;
