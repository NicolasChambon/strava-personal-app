import { Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion/Connexion";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
