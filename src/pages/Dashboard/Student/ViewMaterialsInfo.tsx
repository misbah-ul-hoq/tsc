import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../../axios/api";

const ViewMaterialsInfo = () => {
  const params = useParams();
  console.log(params);
  const { data } = useQuery({
    queryKey: ["view-materials", params.id],
    queryFn: async () => {
      const response = await api.get(`/view-materials?sessionId=${params.id}`);
      return response.data;
    },
  });
  console.log(data);
  return <div>ViewMaterialsInfo</div>;
};

export default ViewMaterialsInfo;
