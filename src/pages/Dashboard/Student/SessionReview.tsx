import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../../axios/api";

const SessionReview = () => {
  const params = useParams();
  console.log(params.id);
  const { data: session } = useQuery({
    queryKey: ["session-review"],
    queryFn: async () => {
      const response = await api.get(`/booked-sessions/${params.id}`);
      return response.data;
    },
  });
  console.log(session);
  return <div>SessionReview</div>;
};

export default SessionReview;
