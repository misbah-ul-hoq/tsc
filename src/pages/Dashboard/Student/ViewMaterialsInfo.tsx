import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import api from "../../../axios/api";
import { materialsType } from "../../../types/materialType";

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
  if (!data)
    return (
      <span className="loading loading-spinner loading-lg text-primary"></span>
    );

  if (data.length == 0)
    return (
      <h2 className="text-2xl text-center font-semibold">
        No Materials uploaded for this session
      </h2>
    );

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL after download
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image", error);
    }
  };

  return (
    <section className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item: materialsType) => {
        const { _id, viewLink, link, title } = item;
        return (
          <div
            key={_id}
            className="card card-compact max-w-96 md:w-auto bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={viewLink}
                alt="Photo"
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="">
                <strong>Google drive link: </strong>{" "}
                <Link className="mt-2 block" to={`${link}`} target="_blank">
                  {link}
                </Link>
              </h2>
              <div className="card-actions justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(viewLink, title);
                  }}
                  className="btn btn-primary"
                  type="button"
                >
                  Download Image
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ViewMaterialsInfo;
