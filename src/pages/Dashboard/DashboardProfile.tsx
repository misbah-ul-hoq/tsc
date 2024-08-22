import { useAuth } from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashboardProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  return (
    <div className="p-4 lg:p-6 space-y-4">
      <img
        src={user?.photoURL || ""}
        alt="User image"
        className="h-48 rounded-lg"
      />
      <h3 className="font-semibold">{user?.displayName}</h3>
      <p>{user?.email}</p>
      <p className="capitalize">{role}</p>
    </div>
  );
};

export default DashboardProfile;
