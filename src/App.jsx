import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./Layout/MasterLayout";
import Organizations from "./pages/Organizations";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import InReview from "./pages/Auth/InReview";
import MatchRequest from "./pages/MatchRequest";
import ResetPassword from "./pages/Auth/ResetPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import useAuth from "./hooks/useAuth";
import LoadingScreen from "./components/LoadingScreen";
import AuthGuard from "./guards/AuthGuard";
import GuestRoute from "./guards/GuestRoute";
import AdminRoute from "./guards/AdminRoute";
import InReviewGuard from "./guards/InReviewGuard";
import MatchResult from './pages/MatchResult';

const router = createBrowserRouter([
  // Guest routes (login, register, reset-password)
  {
    element: <GuestRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },

  // In-review (only unverified users can see it)
  {
    element: <InReviewGuard />,
    children: [
      { path: "/in-review", element: <InReview /> },
    ],
  },

  // Protected (requires auth + verified or admin)
  {
    element: <AuthGuard />,
    children: [
      {
        element: <MasterLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "match-result/:id", element: <MatchResult /> },
          { path: "organizations", element: <Organizations /> },
          { path: "match-request", element: <MatchRequest /> },
        ],
      },
    ],
  },

  // Admin only
  {
    element: <AdminRoute />,
    children: [
      {
        element: <MasterLayout />,
        children: [
          { path: "/admin", element: <AdminDashboard /> },
        ],
      },
    ],
  },

  // Catch-all
  { path: "*", element: <NotFound /> },
]);

function App() {
  const { loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return <RouterProvider router={router} />;
}

export default App;
