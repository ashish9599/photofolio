import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./component/App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhotoProvider } from "./context/photoContext";
import { AuthProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PhotoProvider>
        <App />
        <ToastContainer />
      </PhotoProvider>
    </AuthProvider>
  </React.StrictMode>
);
