import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Restricts routes for logged-in, non-admin users who are NOT subscribed.
 *
 * Unsubscribed users are only allowed to reach the routes wrapped by
 * `AuthGuard` that are NOT wrapped by this guard (i.e. `/requests` and
 * `/match-request`). Any route wrapped by this guard redirects them to
 * `/requests`.
 *
 * Admins and subscribed users pass through unchanged.
 */
const SubscriptionRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  const isSubscribed = user.is_subscribed === true;
  const isAdmin = user.role === "admin";

  if (!isAdmin && !isSubscribed) {
    return <Navigate to="/requests" replace />;
  }

  return <Outlet />;
};

export default SubscriptionRoute;
