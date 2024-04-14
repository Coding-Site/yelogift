import React from "react";
import { createBrowserRouter } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Home from "../pages/Home";
import Categories from "../pages/Categories";

// import Home = React.lazy(() => import('../pages/Home'))

export const router = createBrowserRouter([
  {
    path: "/",
    element: Home,
    children: [
      {
        path: "/cats",
        element: Categories ,
      },
    ],
  },
]);
