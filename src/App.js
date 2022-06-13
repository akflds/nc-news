import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Articles from "./components/Articles";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/all" element={<Articles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
