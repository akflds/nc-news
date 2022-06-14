import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/all" element={<Articles />} />
        <Route path="/t/:topic" element={<Articles />} />
        <Route path="/t/:topic/article/:article_id" element={<Article />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
