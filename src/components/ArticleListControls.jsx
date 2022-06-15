import { NavLink, useParams } from "react-router-dom";
import styles from "./ArticleListControls.module.css";

const ArticleListControls = () => {
  const { topic } = useParams();
  //const activeClassName = "activeControl";
  const path = topic ? `/topic/${topic}/` : `/`;

  return (
    <div className={styles.articleListControls}>
      {["hot", "cold", "new", "old", "top", "bottom"].map((control) => {
        return (
          <NavLink
            key={control}
            className={({ isActive }) =>
              isActive ? `${styles.activeArticleControl}` : undefined
            }
            to={path + control}
          >
            {control}
          </NavLink>
        );
      })}
    </div>
  );
};

export default ArticleListControls;
