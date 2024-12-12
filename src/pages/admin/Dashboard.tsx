import { Link, Outlet } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const Dashboard = () => {
  const sideBarLinks = (
    <>
      <li className="text-lg">
        <Link to={"/dashboard/lessons"}>Lessons</Link>
      </li>
      <li className="text-lg">
        <Link to={"/dashboard/add-lesson"}>Add Lessons</Link>
      </li>
      <li className="text-lg">
        <Link to={"/lessons"}> Add Vocabularies</Link>
      </li>
      <li className="text-lg">
        <Link to={"/lessons"}>Users</Link>
      </li>
      <li className="text-lg">
        <Link to={"/lessons"}>Manage Lesson</Link>
      </li>
      <li className="text-lg">
        <Link to={"/lessons"}>Manage Vocabulary</Link>
      </li>
    </>
  );

  return (
    <div className="font-outFit max-w-[1440px] mx-auto ">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col-reverse items-center justify-center ">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn  drawer-button lg:hidden mt-3"
          >
            <IoMdMenu></IoMdMenu>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {sideBarLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
