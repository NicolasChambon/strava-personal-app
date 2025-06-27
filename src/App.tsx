import { Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
