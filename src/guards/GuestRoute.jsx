import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestRoute = () => {
  const auth = useAuth();
  const user = auth.user;
  const isLoading = auth.loading;

  if (isLoading) {
    return null;
  }

  if (user !== null) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (user.is_verified === false) {
      return <Navigate to="/in-review" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
