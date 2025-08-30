import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import "bootstrap-icons/font/bootstrap-icons.css";
import ClustersHomePage from "./pages/ClustersHomePage";
import CategoriesClusterMenu from "./pages/CategoriesClusterMenu";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:path" element={<Layout />}>
          <Route index element={<MainMenu />} />
          <Route path="/:path/clusters" element={<ClustersHomePage />} />
          <Route
            path="/:path/clusters/:cluster"
            element={<CategoriesClusterMenu />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
