import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import { UserContext } from "./contexts/User";

import "./App.css";

function App() {
  const [user, setUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
  });

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : defaultDark
      ? "dark"
      : "light"
  );

  useEffect(() => {
    localStorage.removeItem("theme");
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App" data-theme={theme}>
        <div className="AppContainer">
          <Header />
          <Settings theme={theme} setTheme={setTheme} />
          <Sidebar />
          <Routes>
            <Route path="/">
              <Route index element={<Articles />} />
              <Route path=":sort" element={<Articles />} />
            </Route>
            <Route path="/topic/:topic">
              <Route index element={<Articles />} />
              <Route path=":sort" element={<Articles />} />
            </Route>
            <Route
              path="/topic/:topic/article/:article_id"
              element={<Article />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
