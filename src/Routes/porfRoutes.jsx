import Accueil from "../pages/Accueil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const porfRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />

      </Routes>
    </Router>
  );
};

export default porfRoutes;