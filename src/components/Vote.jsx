import styles from "./Vote.module.css";
import { updateVote } from "../api/api";
import { useState } from "react";

const Vote = ({ article_id, comment_id, votes }) => {
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [voted, setVoted] = useState(false);
  const [voteDiff, setVoteDiff] = useState(0);

  const handleClick = (amount) => {
    setVoted((curr) => !curr);
    setVoteDiff((curr) => (curr += amount));

    setCurrentVotes((curr) => (curr += amount));
    updateVote(
      article_id ? "articles" : "comments",
      article_id ? article_id : comment_id,
      amount
    ).catch((error) => {
      setCurrentVotes((curr) => (curr -= amount));
      setVoted((curr) => !curr);
      setVoteDiff((curr) => (curr -= amount));
    });
  };

  return (
    <div className={styles.voteContainer}>
      <p>Votes: {currentVotes}</p>
      <div className={styles.voteButtonContainer}>
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
    </div>
  );
};

export default Vote;
