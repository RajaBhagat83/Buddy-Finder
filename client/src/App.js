
import "./App.css";
import Form from "./modules/form";
import Dashboard from "./modules/Dashboard/Dashboard";
import Whatnew from "./Components/Whatnew";

import {
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const ProtectedRoute = ({ children ,auth = false}) => {
  const isLoggedin = localStorage.getItem("user:token") !== null || false;
  if (!isLoggedin && auth) {
    return <Navigate to={"/users/sign_in"} />;
  } else if ( isLoggedin && ["/users/sign_in", "/users/sign_up"].includes(window.location.pathname)) {
    return <Navigate to={"/"} />;
  }
  return children;
};
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/sign_in"
        element={
          <ProtectedRoute >
            <Form isSignin={true} />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/users/sign_up" element={<Form isSignin={false} />}></Route>
       <Route path="/whatnew" element={<Whatnew />} />
    </Routes>
  );
}

export default App;
