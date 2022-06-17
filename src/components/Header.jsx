import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import usePath from "../hooks/usePath";

const Header = () => {
  const { topic } = usePath();

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">NC News</Link>
      </h1>
      {topic ? (
        <h2>
          / <Link to={`/topic/${topic}`}>{topic}</Link>
        </h2>
      ) : null}
    </header>
  );
};

export default Header;
