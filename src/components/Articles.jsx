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
  const [page, setPage] = useState(0);

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadedAllArticles, setLoadedAllArticles] = useState(false);

  useEffect(() => {
    document.title = `NC News${topic ? `: ${topic}` : ""}`;
  }, [topic]);

  useEffect(() => {
    setIsError(false);
  }, [topic]);

  useEffect(() => {
    getArticles(topic, sort_by, order, page)
      .then((fetchedArticles) => {
        if (fetchedArticles.length === 0) {
          setLoadedAllArticles(true);
        }
        setArticles((curr) => {
          if (JSON.stringify(curr) !== JSON.stringify(fetchedArticles)) {
            return [...curr, ...fetchedArticles];
          }
          return curr;
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.msg);
        setIsError(true);
        setIsLoading(false);
      });
  }, [topic, sort_by, order, page]);

  if (isError) return <NotFound errorMessage={errorMessage} />;
  if (topic && isLoading) return <Loading />;

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
      {!loadedAllArticles ? (
        <button
          className={styles.showMoreArticles}
          onClick={() => {
            setPage((curr) => curr + 1);
          }}
        >
          See more
        </button>
      ) : (
        <p className={styles.theEnd}>
          {articles.length ? "You reached the end!" : "No comments... yet!"}
        </p>
      )}
    </section>
  );
};

export default Articles;
