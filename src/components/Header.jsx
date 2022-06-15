import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import usePath from "../hooks/usePath";

const Header = () => {
  const { topic } = usePath();

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      {topic ? (
        <h2>
          / <Link to={`/${topic}`}>{topic}</Link>
        </h2>
      ) : null}
    </header>
  );
};

export default Header;
