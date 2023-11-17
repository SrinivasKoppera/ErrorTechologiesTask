import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Files from "./components/Files";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </div>
  );
}

export default App;
