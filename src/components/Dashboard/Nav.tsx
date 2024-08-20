import { useAuth } from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

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
      <div className="flex-1">
        <button className="btn btn-ghost text-xl">Dashboard</button>
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
