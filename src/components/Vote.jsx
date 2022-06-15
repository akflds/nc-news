import styles from "./Vote.module.css";
import { updateVote } from "../api/api";
import { useState } from "react";

const Vote = ({ article_id, setVotes }) => {
  const [voted, setVoted] = useState(false);
  const [voteDiff, setVoteDiff] = useState(0);

  const handleClick = (amount) => {
    setVoted((curr) => !curr);
    setVoteDiff((curr) => (curr += amount));

    setVotes((curr) => (curr += amount));
    updateVote(article_id, amount).catch((error) => {
      setVotes((curr) => (curr -= amount));
      setVoted((curr) => !curr);
      setVoteDiff((curr) => (curr -= amount));
    });
  };

  return (
    <div className={styles.voteContainer}>
      <button
        className={voted && voteDiff > 0 ? `${styles.clicked}` : null}
        disabled={voted && voteDiff < 0}
        onClick={() => {
          voted ? handleClick(-1) : handleClick(1);
        }}
      >
        Increase
      </button>
      <button
        className={voted & (voteDiff < 0) ? `${styles.clicked}` : null}
        disabled={voted && voteDiff > 0}
        onClick={() => {
          voted ? handleClick(1) : handleClick(-1);
        }}
      >
        Decrease
      </button>
    </div>
  );
};

export default Vote;
