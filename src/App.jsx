import { useState } from 'react'
import {NextUIProvider} from "@nextui-org/react";
import './App.css'
import './output.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ConsoleOutput from './components/ConsoleOutput';

function App() {
  return (
    <NextUIProvider>
      <main className="h-screen dark text-foreground bg-background">
        <Router>
        <Navigation />
          <Routes>
              <Route path="/" element={<div/>}/>

              <Route path="/login" element={<Login/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>

          </Routes>
          {import.meta.env.VITE_REACT_APP_DEV_MODE === "true" && <ConsoleOutput />}
        </Router>
        </main>
        </NextUIProvider>


  )
}

export default App
