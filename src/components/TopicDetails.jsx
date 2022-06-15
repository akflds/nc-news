import usePath from "../hooks/usePath";
import styles from "./TopicDetails.module.css";

const TopicDetails = ({ description }) => {
  const { topic } = usePath();

  return (
    <div className={styles.topicDetails}>
      <h2>Welcome to {topic}</h2>
      <p>{description}</p>
    </div>
  );
};

export default TopicDetails;
