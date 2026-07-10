import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const InReviewGuard = () => {
  const auth = useAuth();
  const user = auth.user;
  const isLoading = auth.loading;

  if (isLoading) {
    return null;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin" || user.is_verified === true) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default InReviewGuard;
