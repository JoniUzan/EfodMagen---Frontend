import { useAuth } from "./context/AuthProvider";
import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import FindShelter from "./pages/FindShelter";
import SheltersDetails from "./pages/SheltersDetails";
import AddShelter from "./pages/AddShelter";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyShelters from "./pages/MyShelters";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";

// Protected
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) {
    return null;
  }

  if (loggedInUser === null) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

// home, login ,register
function RequireUnAuth({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) {
    return null;
  }

  if (loggedInUser !== null) {
    return <Navigate to="/shelters" replace />;
  }

  return children;
}
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="shelters"
            element={
              <RequireAuth>
                <FindShelter />
              </RequireAuth>
            }
          >
            <Route
              path=":id"
              element={
                <RequireAuth>
                  <SheltersDetails />
                </RequireAuth>
              }
            />
            <Route
              path="create"
              element={
                <RequireAuth>
                  <AddShelter />
                </RequireAuth>
              }
            />
            <Route
              path="saved"
              element={
                <RequireAuth>
                  <MyShelters />
                </RequireAuth>
              }
            />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
        </Route>

        <Route
          path="/auth"
          element={
            <RequireUnAuth>
              <AuthLayout />
            </RequireUnAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
