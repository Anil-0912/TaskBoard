import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
]);