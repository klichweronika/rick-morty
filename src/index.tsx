import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CharactersRoutes } from "./characters-page/CharactersRoutes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CharactersRoutes />
    </BrowserRouter>

    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
