import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lessons from "../pages/Lessons";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path:'/lessons',
    element:<Lessons></Lessons>
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
