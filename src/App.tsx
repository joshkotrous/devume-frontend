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
          <div className="h-full flex justify-center">
            <div className="h-full max-w-[1024px] overflow-auto p-4">
              {" "}
              <Routes>
                <Route path="/" element={<ExploreProfiles />} />

                <Route
                  path="/login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/:uuid" element={<UserProfile />} />
              </Routes>
            </div>
          </div>
        </Router>
      </main>
    </NextUIProvider>
  );
}

export default App;
