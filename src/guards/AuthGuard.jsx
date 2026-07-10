import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AuthGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  if (user.role == "admin") {
    return <Navigate to={"/dashboard"} />;
  }
  if (!user.is_verified) {
    return <Navigate to={"/in-review"} />;
  }
  return <Outlet />;
};

export default AuthGuard;
