import styles from "./Vote.module.css";
import { updateVote } from "../api/api";

const Vote = ({ article_id, setVotes }) => {
  const handleClick = (amount) => {
    setVotes((curr) => (curr += amount));
    updateVote(article_id, amount).catch((error) => {
      setVotes((curr) => (curr -= amount));
    });
  };

  return (
    <div className={styles.voteContainer}>
      <button
        onClick={() => {
          handleClick(1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          handleClick(-1);
        }}
      >
        Decrease
      </button>
    </div>
  );
};

export default Vote;
