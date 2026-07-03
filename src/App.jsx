import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./Layout/MasterLayout";
import Navbar from "./Layout/Navbar";
import MyRequests from "./pages/MyRequests";
import Organizations from "./pages/Organizations";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/Auth/resetPassword";
import InReview from "./pages/Auth/InReview";

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
  return <RouterProvider router={router} />;
}

export default App;
