import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./Layout/MasterLayout";
import Navbar from "./Layout/Navbar";
import MyRequests from "./pages/MyRequests";
import Organizations from "./pages/Organizations";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import InReview from "./pages/Auth/InReview";
import MatchRequest from "./pages/MatchRequest";
import ResetPassword from "./pages/Auth/ResetPassword";
import useAuth from "./hooks/useAuth";
import LoadingScreen from "./components/LoadingScreen";
import AuthGuard from "./guards/AuthGuard";
import Home from './pages/Dashboard';

const router = createBrowserRouter([
  // ================= Guest Routes =================

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
  // ================= Protected Routes =================
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <MasterLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "my-requests",
            element: <MyRequests />,
          },
          {
            path: "organizations",
            element: <Organizations />,
          },
          {
            path: "match-request",
            element: <MatchRequest />,
          },
        ],
      },
      {
        path: "/in-review",
        element: <InReview />,
      },
    ],
  },

  // ================= Not Found =================
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  const { loading } = useAuth();
  console.log("Loading:", loading);

  if (loading) {
    return <LoadingScreen />;
  }
  return <RouterProvider router={router} />;
}

export default App;
