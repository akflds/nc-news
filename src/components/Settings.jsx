import styles from "./Settings.module.css";
const Settings = ({ theme, setTheme }) => {
  const handleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={styles.settings}>
      <button onClick={handleDarkMode}>
        {theme === "light" ? "Dark" : "Light"} mode
      </button>
    </div>
  );
};

export default Settings;
