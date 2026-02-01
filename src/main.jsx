import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import MealsProvider from "./provider/MealsProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MealsProvider>
        <RouterProvider router={router}></RouterProvider>
      </MealsProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
