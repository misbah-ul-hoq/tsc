import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import api from "../axios/api";

const useSessions = (status = "") => {
  const { user } = useAuth();
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await api.get(
        `/study-session?email=${user ? user.email : ""}&status=${status}`
      );
      return res.data;
    },
  });
  return { sessions, refetch };
};

export default useSessions;
