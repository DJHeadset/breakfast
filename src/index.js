import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Breakfast from "./pages/Breakfast";
import Welcome from "./pages/Welcome.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import Lunch from "./pages/Lunch.jsx";
import Dinner from "./pages/Dinner.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/breakfast",
    element: <Breakfast />,
  },
  {
    path: "/lunch",
    element: <Lunch />,
  },
  {
    path: "/dinner",
    element: <Dinner />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
