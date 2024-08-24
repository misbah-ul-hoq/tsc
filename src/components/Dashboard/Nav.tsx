import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Sidebar from "./Sidebar";

const DashboardNav = () => {
  const { user } = useAuth();
  const { role } = useRole();
  if (!role)
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  return (
    <div className="navbar pl-0 bg-neutral text-neutral-content pr-3">
      <div className="drawer lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ml-2">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <img src="/menu.svg" className="h-10" />
          </label>
        </div>
        <div className="drawer-side z-10">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full p-4">
            {/* Sidebar content here */}
            <Sidebar />
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Link to="/dashboard" className="lg:btn lg:btn-ghost text-xl hidden">
          Dashboard
        </Link>
      </div>
      <div className="flex-none">
        <div className="flex items-center gap-2">
          <img
            src={user?.photoURL || ""}
            alt="user img"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-sm font-medium">{user?.displayName}</h3>
            <p className="text-xs">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
