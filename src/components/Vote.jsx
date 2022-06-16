import styles from "./Vote.module.css";
import { updateVote } from "../api/api";
import { useState } from "react";

const Vote = ({ article_id, comment_id, votes }) => {
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [voted, setVoted] = useState(false);
  const [voteDiff, setVoteDiff] = useState(0);

  // TODO: track if a user has voted on an article or comment already
  // TODO: disable votes for users own article or comment

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

  // TODO: button code feels quite WET, consider refactor into VoteButton
  // TODO: check if voted is necessary or can be done entirely on voteDiff

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
          Upvote
        </button>
        <button
          className={voted & (voteDiff < 0) ? `${styles.clicked}` : null}
          disabled={voted && voteDiff > 0}
          onClick={() => {
            voted ? handleClick(1) : handleClick(-1);
          }}
        >
          Downvote
        </button>
      </div>
    </div>
  );
};

export default Vote;
