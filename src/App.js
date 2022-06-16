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
  const [user, setUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
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
    </UserContext.Provider>
  );
}

export default App;
