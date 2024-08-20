import { useQuery } from "@tanstack/react-query";
import api from "../axios/api";
import { useAuth } from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const { data: role } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const result = await api.get(`/user/${user?.email}`);
      // const result = await axios.get(
      //   `http://localhost:8080/user/${user?.email}`
      // );
      return result.data?.role;
    },
  });
  return { role };
};

export default useRole;
