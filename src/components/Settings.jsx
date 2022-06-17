import { useState } from "react";
import styles from "./Settings.module.css";
const Settings = ({ theme, setTheme }) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleDarkMode = (event) => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className={styles.settings}>
      <button onClick={() => setShowSettings((curr) => !curr)}>Settings</button>
      {showSettings ? undefined : (
        <div>
          <button onClick={handleDarkMode}>Light/Dark</button>
        </div>
      )}
    </div>
  );
};

export default Settings;
