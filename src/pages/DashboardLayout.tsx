import { Outlet } from "react-router-dom";
import DashboardNav from "../components/Dashboard/Nav";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-5 px-5">
      <div className="col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-9">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
