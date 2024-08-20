import useRole from "../../hooks/useRole";

const Sidebar = () => {
  const { role } = useRole();

  if (!role)
    return <span className="loading loading-spinner loading-lg"></span>;

  return <aside>{role}</aside>;
};

export default Sidebar;
