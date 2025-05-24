import { Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion/Connexion";
import Home from "./pages/Home/Home";
import LastActivities from "./pages/LastActivities/LastActivities";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/home" element={<Home />} />
        <Route path="/last-activities" element={<LastActivities />} />
      </Routes>
    </div>
  );
}

export default App;
