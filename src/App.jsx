import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./Layout/MasterLayout";
import Navbar from "./Layout/Navbar";
import MyRequests from "./pages/MyRequests";
import Organizations from "./pages/Organizations";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import InReview from "./pages/Auth/InReview";
import MatchRequest from "./pages/MatchRequest";
import ResetPassword from "./pages/Auth/ResetPassword";
import useAuth from "./hooks/useAuth";
import LoadingScreen from "./components/LoadingScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        path: "/my-requests",
        element: <MyRequests />,
      },
      {
        path: "/organizations",
        element: <Organizations />,
      },
      {
        path: "/match-request",
        element: <MatchRequest />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/in-review",
        element: <InReview />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  const { loading } = useAuth();
  if (loading) {
    return <LoadingScreen />;
  }
  return <RouterProvider router={router} />;
}

export default App;
