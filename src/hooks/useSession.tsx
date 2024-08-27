import { useQuery } from "@tanstack/react-query";
import api from "../axios/api";

const useSession = (id: string) => {
  const { data } = useQuery({
    queryKey: ["session-details"],
    queryFn: async () => {
      const response = await api.get(`/study-session/${id}`);
      return response.data;
    },
  });
  return { data };
};

export default useSession;
