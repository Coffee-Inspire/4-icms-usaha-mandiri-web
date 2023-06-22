import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoutes from "./helpers/PrivateRoutes";
import Login from "./screens/Authentication/Login";
import MainLayout from "./screens/MainLayout";

function App() {
  const [reqPath, setReqPath] = useState("");
  const prefix = "/dashboard";
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login reqPath={reqPath} />} path="/login" exact />
          <Route element={<PrivateRoutes setReqPath={setReqPath} />}>
            <Route
              element={<MainLayout prefix={prefix} setReqPath={setReqPath} />}
              path={`${prefix}/*`}
            />
          </Route>
          <Route element={<Navigate to="/login" replace={true} />} path="/*" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
