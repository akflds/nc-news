import { useState, useEffect } from "react";
import { fetchArticles } from "../api/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(fetchArticles());
    // .then((fetchedArticles) => {
    //   setArticles(fetchedArticles);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }, []);

  return (
    <>
      <h2>Latest articles</h2>
      <ul>
        {articles.map((article) => {
          return <li>{article}</li>;
        })}
      </ul>
    </>
  );
};

export default Articles;
