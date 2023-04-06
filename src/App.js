import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./helpers/PrivateRoutes";
import Login from "./screens/Authentication/Login";
import MainLayout from "./screens/MainLayout";

function App() {
  const prefix = "/dashboard";
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login />} path="/login" exact />
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
