import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardReview from "./pages/DashboardReview.jsx";
import Form from "./components/Form.jsx";
import Sucsess from "./pages/Sucsess.jsx";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/auth/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/request/:type",
    element: <Form />,
  },
  {
    path: "/dashboard",
    element: <DashboardReview />,
  },
  {
    path: "/sucsess",
    element: <Sucsess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
