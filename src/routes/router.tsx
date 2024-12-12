import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lessons from "../pages/Lessons";
import Vocabulary from "../pages/Vocabulary";

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
    path:'/lessons/:lesson_no',
    element:<Vocabulary></Vocabulary>
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
