import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import usePath from "../hooks/usePath";
import Settings from "./Settings";
import useWindowSize from "../hooks/useWindowSize";

const Header = ({ theme, setTheme }) => {
  const { topic } = usePath();
  const { width } = useWindowSize();

  return (
    <header className={styles.header}>
      <div
        style={{
          display: "flex ",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0",
        }}
      >
        <h1>
          <Link to="/">NC News</Link>
        </h1>
        {topic ? (
          <h2>
            / <Link to={`/topic/${topic}`}>{topic}</Link>
          </h2>
        ) : null}
      </div>
      {width < 600 ? <Settings theme={theme} setTheme={setTheme} /> : null}
    </header>
  );
};

export default Header;
