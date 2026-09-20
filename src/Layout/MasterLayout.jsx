import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const MasterLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[90vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MasterLayout;
