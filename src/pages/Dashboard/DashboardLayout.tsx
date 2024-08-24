import { Outlet } from "react-router-dom";
import DashboardNav from "../../components/Dashboard/Nav";
import Sidebar from "../../components/Dashboard/Sidebar";
import useDocumentTitle from "dynamic-title-react";

const DashboardLayout = () => {
  useDocumentTitle("Dashboard | Teacher Student Center");
  return (
    <div className="grid lg:grid-cols-12 h-screen overflow-auto">
      <div className="lg:col-span-3 xl:col-span-2 hidden lg:block overflow-auto min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:col-span-9 xl:col-span-10 overflow-auto min-h-">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
