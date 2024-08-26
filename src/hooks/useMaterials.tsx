import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import api from "../axios/api";

const useMaterials = (showAll = false) => {
  const { user } = useAuth();
  const { data: materials = [], refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await api.get(
        `/session-materials${!showAll ? "?email=" : ""}${
          !showAll ? (user ? user.email : "") : ""
        }`
      );
      return res.data;
    },
  });
  return { materials, refetch };
};

export default useMaterials;
