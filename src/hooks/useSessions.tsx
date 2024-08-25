import { useQuery } from "@tanstack/react-query";
import api from "../axios/api";

const useSessions = (status = "", email = "") => {
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await api.get(
        `/study-session?email=${email}&status=${status}`
      );
      return res.data;
    },
  });
  return { sessions, refetch };
};

export default useSessions;
