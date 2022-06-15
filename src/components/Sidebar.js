import usePath from "../hooks/usePath";
import { getTopics } from "../api/api";

import TopicDetails from "./TopicDetails";
import TopicList from "./TopicList";

import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { topic } = usePath();
  const [topics, setTopics] = useState(Array(3).fill([]));
  const [topicDescription, setTopicDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [topic]);

  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
        if (topic) {
          const [{ description }] = fetchedTopics.filter(
            (t) => t.slug === topic
          );
          setTopicDescription(description);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  }, [topic]);

  return (
    <nav className={styles.sidebar}>
      {topic && !isError ? (
        <TopicDetails description={topicDescription} />
      ) : null}
      <TopicList topics={topics} isLoading={isLoading} />
    </nav>
  );
};

export default Sidebar;
