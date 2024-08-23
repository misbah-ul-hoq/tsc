import Swal from "sweetalert2";
import api from "../../axios/api";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

interface cardProps {
  _id: string;
  sessionId: string;
  tutorEmail: string;
  title: string;
  link: string;
  viewLink: string;
}
const MaterialCard = ({
  data,
  refetch,
}: {
  data: cardProps;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
}) => {
  const { _id, viewLink, title } = data;

  // delete function
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/session-materials/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // update function

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={viewLink} alt={title} className="w-full h-40 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {/* <p>{de}</p> */}
        <div className="card-actions justify-end">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              const dialog = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement;
              dialog?.showModal();
            }}
          >
            Update
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-warning">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          {/* delete button */}
          <button
            className="btn btn-sm btn-primary btn-error"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
