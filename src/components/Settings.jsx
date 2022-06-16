import { useState } from "react";
import styles from "./Settings.module.css";
const Settings = ({ setTheme }) => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <div className={styles.settings}>
      <button onClick={() => setShowSettings((curr) => !curr)}>Settings</button>
      {showSettings ? undefined : (
        <div>
          <button
            onClick={() => {
              setTheme((currTheme) =>
                currTheme === "light" ? "dark" : "light"
              );
            }}
          >
            Light/Dark
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
