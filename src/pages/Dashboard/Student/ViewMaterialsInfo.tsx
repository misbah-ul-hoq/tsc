import { useParams } from "react-router-dom";

const ViewMaterialsInfo = () => {
  const params = useParams();
  console.log(params);
  return <div>ViewMaterialsInfo</div>;
};

export default ViewMaterialsInfo;
