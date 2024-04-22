import { useState } from 'react'
import {NextUIProvider, Button} from "@nextui-org/react";
import './App.css'
import './output.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {

  return (
      <NextUIProvider>
        <Navigation />
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<div/>}/>

              <Route path="/login" element={<Login/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>

          </Routes>

        </BrowserRouter>

      </NextUIProvider>

  )
}

export default App
