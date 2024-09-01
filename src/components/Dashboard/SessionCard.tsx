import Swal from "sweetalert2";
import api from "../../axios/api";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface dataProps {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  status: string;
  showUploadMaterialsBtn?: boolean;
  tutorEmail: string;
}

const SessionCard = ({
  data,
  showUploadMaterialsBtn,
  refetch,
}: {
  data: dataProps;
  showUploadMaterialsBtn?: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
}) => {
  const { _id, sessionTitle, sessionDescription, status } = data;

  const handleApply = () => {
    api.patch(`/study-session/${_id}`, { status: "pending" }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Re apply successfully",
          icon: "success",
        });
        refetch();
      }
    });
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{sessionTitle}</h2>
        <p>{sessionDescription}</p>
        <div className="card-actions justify-end">
          {/* this button only shows the status */}
          <button
            className={`btn  ${
              status == "pending"
                ? "btn-primary"
                : status == "approved"
                ? "btn-success"
                : "btn-error"
            }`}
          >
            {status}
          </button>

          {/* re apply button */}
          {status == "rejected" && (
            <button
              className="btn  btn-secondary"
              onClick={() => {
                handleApply();
              }}
            >
              Re apply?
            </button>
          )}

          {/* upload materials button */}
          {showUploadMaterialsBtn && (
            <>
              <Link
                to={`/dashboard/upload-materials/${_id}`}
                className="btn btn-accent"
              >
                Upload materials
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
