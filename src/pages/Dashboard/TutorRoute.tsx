import { ReactNode } from "react";
import useRole from "../../hooks/useRole";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TutorRoute = ({ children }: { children: ReactNode }) => {
  const { role } = useRole();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  if (!role) return <span className="loading loading-spinner"></span>;
  if (role == "tutor") return <div>{children}</div>;
  else {
    logOut().then(() => {
      navigate("/login");
    });
  }
};

export default TutorRoute;
