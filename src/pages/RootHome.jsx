import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Home from "./Home";
import Landing from "./Landing";

const RootHome = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (user === null) return <Landing />;

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Unsubscribed regular users start on the match form.
  if (user.is_subscribed !== true) {
    return <Navigate to="/match-request" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[90vh]">
        <Home />
      </main>
      <Footer />
    </>
  );
};

export default RootHome;
