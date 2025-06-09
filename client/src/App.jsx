import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Homepage from "./Homepage/Homepage";
import { useAuth } from "./contexts/authenContext";
import AuthenticatedApp from "./AuthenticatedApp";
import AuthenticatedAdminApp from "./AuthenticatedAdminApp";

function App() {
  const { isAuthen, state } = useAuth();
  return (
    <>
      {isAuthen ? (
        state.role === "user" ? (
          <AuthenticatedApp />
        ) : (
          <AuthenticatedAdminApp />
        )
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Login />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
