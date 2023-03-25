import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./helpers/PrivateRoutes";
// import logo from "./logo.svg";
import MainLayout from "./screens/MainLayout";

// import "./App.css";

function App() {
  const prefix = "/dashboard";
  return (
    <>
      <Router>
        <Routes>
          <Route element={<h1>Login</h1>} path="/login" exact />
          <Route element={<PrivateRoutes />}>
            <Route
              element={<MainLayout prefix={prefix} />}
              path={`${prefix}/*`}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
