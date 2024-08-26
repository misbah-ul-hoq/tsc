import { ChangeEvent, FormEvent, useState } from "react";
import useSessions from "../../../hooks/useSessions";
import sessionType from "../../../types/sessionType";
import api from "../../../axios/api";
import Swal from "sweetalert2";

const ViewSessionsAdmin = () => {
  const { sessions, refetch } = useSessions();
  const [currentSession, setCurrentSession] = useState<sessionType | null>(
    null
  );
  const [isPaid, setIsPaid] = useState(false);
  // console.log(currentSession);
  const handleApprove = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let price;
    const priceInput = event.currentTarget.price;
    // const priceInput = parseFloat(event.currentTarget.price.value);
    if (!priceInput) {
      price = 0;
    } else price = parseFloat(priceInput.value);
    console.log(price);
    api
      .patch(`/study-session/${currentSession?._id}`, {
        registrationFee: price,
        status: "approved",
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Updated successfully",
            icon: "success",
          });
          refetch();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: err.message,
          icon: "error",
        });
      });
  };

  const handleReject = () => {
    const id = currentSession?._id;
    console.log(id);
    if (id) {
      api
        .patch(`/study-session/${id}`, {
          status: "rejected",
        })
        .then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Rejected!",
              icon: "success",
            });
            refetch();
          }
        });
    }
  };

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const update = event.currentTarget.updateFee.value;
    const updatePrice = parseFloat(update);

    api
      .patch(`/study-session/${currentSession?._id}`, {
        registrationFee: updatePrice,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            titleText: "Updated successfully",
            icon: "success",
          });
          refetch();
        }
      });
  };

  const handleDelete = () => {
    api.delete(`/study-session/${currentSession?._id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          title: "Deleted successfully",
          icon: "success",
        });
        refetch();
      }
    });
  };

  return (
    <section className="p-3">
      <h2 className="text-3xl font-semibold">View all sessions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sessions.toReversed().map((session: sessionType) => {
          const { _id, sessionTitle, sessionDescription, status, tutorEmail } =
            session;
          return (
            <div key={_id} className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  {sessionTitle}{" "}
                  <button
                    className={`badge ${
                      status == "approved"
                        ? "badge-success"
                        : status == "rejected"
                        ? "badge-error"
                        : "badge-primary"
                    } `}
                  >
                    {status}
                  </button>
                </h2>
                <p>{sessionDescription}</p>
                <p>{tutorEmail}</p>
                {status == "approved" && <p>Fee: {session.registrationFee}</p>}
                <div className="card-actions justify-end">
                  {/* This two buttons are responsible for approving and rejecting pending sessions */}
                  {status == "pending" && (
                    <>
                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                      <button
                        className="btn btn-sm btn-accent"
                        onClick={() => {
                          const modal = document.getElementById(
                            "my_modal_1"
                          ) as HTMLDialogElement;
                          modal?.showModal();
                          setCurrentSession(session);
                          setIsPaid(false);
                        }}
                      >
                        Approve
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            Tell us details {currentSession?.sessionTitle}
                          </h3>
                          <div className="modal-action mt-3 flex-col gap-2">
                            <form
                              method="dialog"
                              onSubmit={handleApprove}
                              className="flex flex-col gap-3"
                            >
                              <select
                                className="select select-bordered w-full"
                                onChange={(
                                  event: ChangeEvent<HTMLSelectElement>
                                ) => {
                                  console.log(event.target.value);
                                  if (event.target.value == "paid")
                                    setIsPaid(true);
                                }}
                              >
                                <option defaultValue="nothing">
                                  Is this session free or paid (Select)?
                                </option>
                                <option value="free">Free</option>
                                <option value="paid">Paid</option>
                              </select>
                              {isPaid && (
                                <input
                                  type="number"
                                  name="price"
                                  placeholder="Enter price here"
                                  className="input input-bordered input-primary w-full"
                                />
                              )}
                              <button className="btn btn-primary btn-sm">
                                Approve
                              </button>
                            </form>
                            <form
                              method="dialog"
                              className="justify-self-end self-end"
                              onSubmit={() => {
                                setCurrentSession(null);
                                setIsPaid(false);
                              }}
                            >
                              {/* if there is a button in form, it will close the modal */}
                              <button
                                className="btn"
                                onClick={() => {
                                  setCurrentSession(null);
                                  setIsPaid(false);
                                }}
                              >
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          setCurrentSession(session);
                          Swal.fire({
                            title: "Are you sure?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, reject it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleReject();
                            }
                          });
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {/* this two buttons are responsible for updating and deleting approved sessions */}
                  {status == "approved" && (
                    <>
                      <button
                        className="btn btn-sm btn-accent"
                        onClick={() => {
                          const modal = document.getElementById(
                            "my_modal_2"
                          ) as HTMLDialogElement;
                          modal?.showModal();
                          setCurrentSession(session);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          setCurrentSession(session);
                          Swal.fire({
                            title: "Are you sure to Delete it?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete();
                            }
                          });
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* modal for updating approving session's data */}
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        Update {currentSession?.sessionTitle}
                      </h3>
                      <div className="modal-action flex-col">
                        <form
                          onSubmit={handleUpdate}
                          className="flex flex-col gap-3"
                        >
                          <input
                            type="text"
                            name="updateFee"
                            placeholder={JSON.stringify(
                              currentSession?.registrationFee
                            )}
                            defaultValue={currentSession?.registrationFee}
                            className="input input-bordered block"
                          />
                          <button className="btn btn-secondary">Update</button>
                        </form>
                        <form method="dialog" className="mt-4 flex justify-end">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ViewSessionsAdmin;
