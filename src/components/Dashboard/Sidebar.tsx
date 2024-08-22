import { NavLink } from "react-router-dom";
import useRole from "../../hooks/useRole";
import Logo from "../Shared/Logo";

const Sidebar = () => {
  const { role } = useRole();

  if (!role)
    return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <aside className="bg-base-200 px-5 min-h-screen">
      {/* These links are  for tutors */}
      <div>
        {role == "tutor" && (
          <ul className="space-y-1 pt-3">
            <li className="mb-5">
              <Logo />
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/create-session">Create Session</NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/view-sessions">View all Sessions</NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/upload-materials">
                Upload Materials
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/view-materials">View Materials</NavLink>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
