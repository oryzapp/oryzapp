import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Main from './pages/Main'
import { AuthProvider } from "./components/AuthProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Main />} ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
