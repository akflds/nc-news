import { NavLink, useParams } from "react-router-dom";
import styles from "./ArticleListControls.module.css";

const ArticleListControls = () => {
  const { topic } = useParams();
  const path = topic ? `/topic/${topic}/` : `/`;

  const controls = [
    { hot: "Most comments" },
    { cold: "Least comments" },
    { new: "Newest" },
    { old: "Oldest" },
    { top: "Most votes" },
    { bottom: "Least votes" },
  ];

  return (
    <div className={styles.articleListControls}>
      {controls.map((control) => {
        const [route, display] = Object.entries(control)[0];
        return (
          <NavLink
            key={route}
            className={({ isActive }) =>
              isActive ? `${styles.activeArticleControl}` : undefined
            }
            to={path + route}
          >
            {display}
          </NavLink>
        );
      })}
    </div>
  );
};

export default ArticleListControls;
