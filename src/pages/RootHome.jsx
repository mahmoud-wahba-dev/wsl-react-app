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

  // Unsubscribed regular users can only see /requests and /match-request.
  // Unlicensed users start on the match form; licensed users on requests.
  if (user.is_subscribed !== true) {
    const target = user.is_licensed === false ? "/match-request" : "/requests";
    return <Navigate to={target} replace />;
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
