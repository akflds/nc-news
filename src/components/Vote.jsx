import styles from "./Vote.module.css";
import { UserContext } from "../contexts/User";

import { updateVote } from "../api/api";
import { useState, useContext } from "react";

const Vote = ({ article_id, comment_id, votes, author }) => {
  const { user } = useContext(UserContext);

  const [currentVotes, setCurrentVotes] = useState(votes);
  const [voteDiff, setVoteDiff] = useState(0);

  // TODO: track if a user has voted on an article or comment already

  const handleClick = (amount) => {
    setVoteDiff((curr) => (curr += amount));

    setCurrentVotes((curr) => (curr += amount));
    updateVote(
      article_id ? "articles" : "comments",
      article_id ? article_id : comment_id,
      amount
    ).catch((error) => {
      setCurrentVotes((curr) => (curr -= amount));
      setVoteDiff((curr) => (curr -= amount));
    });
  };

  return (
    <div className={styles.voteContainer}>
      <p>Votes: {currentVotes}</p>
      <div className={styles.voteButtonContainer}>
        <button
          className={voteDiff > 0 ? `${styles.clicked}` : null}
          disabled={voteDiff < 0 || user.name === author}
          onClick={() => {
            voteDiff > 0 ? handleClick(-1) : handleClick(1);
          }}
        >
          Upvote
        </button>
        <button
          className={voteDiff < 0 ? `${styles.clicked}` : null}
          disabled={voteDiff > 0 || user.name === author}
          onClick={() => {
            voteDiff < 0 ? handleClick(1) : handleClick(-1);
          }}
        >
          Downvote
        </button>
      </div>
    </div>
  );
};

export default Vote;
