import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import "./output.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ConsoleOutput from "./components/ConsoleOutput.jsx";
import Cookies from "js-cookie";
import { useEffect } from "react";
import UserProfile from "./pages/UserProfile.tsx";
import ExploreProfiles from "./pages/ExploreProfiles.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") != null || Cookies.get("token") != undefined) {
      setIsAuthenticated(true);
    }
    console.log("Authenticated: " + isAuthenticated);
  }, [isAuthenticated]);
  return (
    <NextUIProvider>
      <main className="h-screen dark text-foreground bg-background">
        <Router>
          <Navigation isAuthenticated={isAuthenticated} />
          <Routes>
            <Route path="/" element={<ExploreProfiles />} />

            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/:username" element={<UserProfile />} />
          </Routes>
          {import.meta.env.VITE_REACT_APP_DEV_MODE === "true" && (
            <ConsoleOutput />
          )}
        </Router>
      </main>
    </NextUIProvider>
  );
}

export default App;
