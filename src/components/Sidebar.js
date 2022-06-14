import useTopicPath from "../hooks/useTopicPath";
import { getTopics } from "../api/api";

import TopicDetails from "./TopicDetails";
import TopicList from "./TopicList";

import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [topics, setTopics] = useState([]);
  const [topicDescription, setTopicDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { topic } = useTopicPath("/t/:topic");

  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
        if (topic) {
          const [{ description }] = fetchedTopics.filter(
            (t) => t.slug === topic
          );
          setTopicDescription(description);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.sidebar}>
      {topic ? (
        <TopicDetails topic={topic} description={topicDescription} />
      ) : (
        <TopicList topics={topics} />
      )}
    </div>
  );
};

export default Sidebar;
