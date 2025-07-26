import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react"
function App() {
  const History = lazy(() => import("./components/History"));
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-neutral-900">
      {/* Backgrounds */}
      <ShootingStars className="absolute inset-0 z-0" />
      <StarsBackground className="absolute inset-0 z-0" />

      {/* Fixed Header */}
      <Header />
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
    />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/history"
          element={
            <Suspense fallback={"Loading"}>
              <History />
            </Suspense>
          }
        />
      </Routes>
      <Analytics/>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
