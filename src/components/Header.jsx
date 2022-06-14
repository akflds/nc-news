import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useTopicPath from "../hooks/useTopicPath";

const Header = () => {
  const { topic } = useTopicPath("/t/:topic");

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      {topic ? (
        <h2>
          / <Link to={`/t/${topic}`}>{topic}</Link>
        </h2>
      ) : null}
    </header>
  );
};

export default Header;
