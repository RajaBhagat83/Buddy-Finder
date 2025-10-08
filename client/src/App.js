import logo from "./logo.svg";
import "./App.css";
import Form from "./modules/form";
import Dashboard from "./modules/Dashboard/Dashboard";
import Whatnew from "./Components/Whatnew";
import Landing from "./Pages/AppLanding/Landing.jsx";

import {
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Messanging from "./modules/Elements/Messanging.js";

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedin = localStorage.getItem("user:token") !== null || false;
  if (!isLoggedin && auth) {
    return <Navigate to={"/"} />;
  } else if (
    isLoggedin &&
    ["/users/sign_in", "/users/sign_up"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/DashBoard"} />;
  }
  return children;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("user:token"));
  const [user, setUser] = useState(localStorage.getItem("user:details"));

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user:details");
    localStorage.removeItem("user:token");
  };

  return (
    <Routes>
      <Route
        path="/DashBoard"
        element={
          <ProtectedRoute auth={true}>
            {token ? (
              <Dashboard handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )}
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute auth={false}>
            {token ? (
             <Navigate to= "/DashBoard" />
            ) : (
              <Landing />
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/sign_in"
        element={
          <ProtectedRoute>
            <Form isSignin={true}  setToken={setToken} setUser={setUser}   />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/users/sign_up" element={<Form isSignin={false} setToken={setToken} setUser={setUser} />}></Route>
      <Route path="/whatnew" element={<Whatnew />} />
      <Route path="/Messages" element={<Messanging />} />
    </Routes>
  );
}

export default App;
