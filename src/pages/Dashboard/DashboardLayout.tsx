import { Outlet } from "react-router-dom";
import DashboardNav from "../../components/Dashboard/Nav";
import Sidebar from "../../components/Dashboard/Sidebar";
import useDocumentTitle from "dynamic-title-react";

const DashboardLayout = () => {
  useDocumentTitle("Dashboard | Teacher Student Center");
  return (
    <div className="grid grid-cols-12 h-screen overflow-auto">
      <div className="col-span-2 overflow-auto min-h-screen">
        <Sidebar />
      </div>
      <div className="col-span-10 overflow-auto min-h-screen">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
