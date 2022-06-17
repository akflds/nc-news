import styles from "./Vote.module.css";
import { UserContext } from "../contexts/User";

import { updateVote } from "../api/api";
import { useState, useContext } from "react";

const Vote = ({ article_id, comment_id, votes, author }) => {
  const { user } = useContext(UserContext);

  const [currentVotes, setCurrentVotes] = useState(votes);
  const [voted, setVoted] = useState(false);
  const [voteDiff, setVoteDiff] = useState(0);

  // TODO: track if a user has voted on an article or comment already

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
          disabled={(voted && voteDiff < 0) || user.name === author}
          onClick={() => {
            voted ? handleClick(-1) : handleClick(1);
          }}
        >
          Upvote
        </button>
        <button
          className={voted & (voteDiff < 0) ? `${styles.clicked}` : null}
          disabled={(voted && voteDiff > 0) || user.name === author}
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
