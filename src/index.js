import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Main from './pages/Main'
import { AuthProvider } from "./components/AuthProvider";
import Test from "./components/Test";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Main />} ></Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </AuthProvider>
  </BrowserRouter>
  // // </React.StrictMode>
  // <Test />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
