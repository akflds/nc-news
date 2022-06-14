import useTopicPath from "../hooks/useTopicPath";
import { getTopics } from "../api/api";

import TopicDetails from "./TopicDetails";
import TopicList from "./TopicList";

import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [topics, setTopics] = useState([]);
  const [description, setDescription] = useState("");

  const { topic } = useTopicPath("/t/:topic");

  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
        if (topic) {
          const [{ d }] = fetchedTopics.filter((t) => t.slug === topic);
          setDescription(d);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [topic]);

  return (
    <div className={styles.sidebar}>
      {topic ? (
        <TopicDetails topic={topic} description={description} />
      ) : (
        <TopicList topics={topics} />
      )}
    </div>
  );
};

export default Sidebar;
