import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lessons from "../pages/Lessons";
import Vocabulary from "../pages/Vocabulary";
import Dashboard from "../pages/admin/Dashboard";
import AdminLessons from "../pages/admin/Lessons";
import AddLesson from "../pages/admin/AddLesson";
import AddVocabulary from "../pages/admin/AddVocabulary";
import ManageUser from "../pages/admin/ManageUser";
import ManageLesson from "../pages/admin/ManageLesson";
import ManageVocabulary from "../pages/admin/ManageVocabulary";
import Tutorial from "../pages/Tutorial";

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
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/lessons",
        element: <AdminLessons></AdminLessons>,
      },
      {
        path: "/dashboard/add-lesson",
        element: <AddLesson></AddLesson>,
      },
      {
        path: "/dashboard/add-vocabulary",
        element: <AddVocabulary></AddVocabulary>,
      },
      {
        path: "/dashboard/users",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "/dashboard/manage-lesson",
        element: <ManageLesson></ManageLesson>,
      },
      {
        path: "/dashboard/manage-vocabulary",
        element: <ManageVocabulary></ManageVocabulary>,
      },
    ],
  },
  {
    path: "/lessons",
    element: <Lessons></Lessons>,
  },
  {
    path: "/tutorial",
    element: <Tutorial></Tutorial>,
  },
  {
    path: "/lessons/:lesson_no",
    element: <Vocabulary></Vocabulary>,
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
