import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/Router";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <RouterProvider router={router}/>
);
