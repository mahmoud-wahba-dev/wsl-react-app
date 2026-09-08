import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthGuard = () => {
  const auth = useAuth();
  const user = auth.user;
  const isLoading = auth.loading;

  if (isLoading) {
    return null;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
