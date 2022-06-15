import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Footer from "./components/Footer";

import { UserContext } from "./contexts/User";

import "./App.css";
import NotFound from "./components/NotFound";

function App() {
  const [user, setUser] = useState("tickle122");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route
            path="/hot"
            element={<Articles sort_by={"comment_count"} order={"desc"} />}
          />
          <Route
            path="/new"
            element={<Articles sort_by={"created_at"} order={"desc"} />}
          />
          <Route
            path="/top"
            element={<Articles sort_by={"votes"} order={"desc"} />}
          />
          <Route path="/topic/:topic" element={<Articles />} />
          <Route
            path="/topic/:topic/article/:article_id"
            element={<Article />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
