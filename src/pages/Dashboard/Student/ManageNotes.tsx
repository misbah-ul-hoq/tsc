import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios/api";
import { FormEvent, useState } from "react";

type noteType = {
  _id: string;
  title: string;
  description: string;
  email: string;
};

const ManageNotes = () => {
  const { user } = useAuth();
  const [currentNote, setCurrentNote] = useState<noteType | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({
    success: "",
    error: "",
  });

  const { data: notes = [] } = useQuery({
    queryKey: ["notes", user?.email as string],
    queryFn: async () => {
      const response = await api.get(`/notes/${user?.email}`);
      return response.data;
    },
  });

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setUpdateMessage({ success: "", error: "" });
    const title = (
      event.currentTarget.elements.namedItem("title") as HTMLInputElement
    ).value;
    const description = (
      event.currentTarget.elements.namedItem("description") as HTMLInputElement
    ).value;
    console.log({ title, description });
    api
      .patch(`/notes/${currentNote?._id}`, {
        title,
        description,
      })
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setUpdateMessage({
            ...updateMessage,
            success: "Updated successfully",
          });
        }
      })
      .catch(() => {
        setLoading(false);
        setUpdateMessage({
          ...updateMessage,
          error: "Error!",
        });
      });
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold">Manage Notes</h2>
      {!notes.length && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note: noteType) => {
          const { _id, title, description, email } = note;
          return (
            <div key={_id} className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <p>{email}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-error">Delete</button>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setCurrentNote(note);
                      const dialog = document.getElementById(
                        "my_modal_1"
                      ) as HTMLDialogElement;
                      dialog.showModal();
                    }}
                  >
                    Update
                  </button>

                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        Update {currentNote?.title}
                      </h3>
                      <div className="modal-action flex-col">
                        <form onSubmit={handleUpdate} className="">
                          <div className="mb-4">
                            <label
                              className="block text-sm font-medium mb-2"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={user?.email as string}
                              readOnly
                              className="input input-bordered w-full"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-sm font-medium mb-2"
                              htmlFor="title"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              className="input input-bordered w-full"
                              defaultValue={currentNote?.title}
                              placeholder="Enter the title of the note"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              className="block text-sm font-medium mb-2"
                              htmlFor="description"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              className="textarea textarea-bordered w-full"
                              placeholder="Enter the description of the note"
                              defaultValue={currentNote?.description}
                            />
                          </div>

                          <div className="messagees mb-2">
                            {" "}
                            {loading && (
                              <span className="loading loading-spinner loading-md"></span>
                            )}
                            {updateMessage.success && (
                              <p className="text-success text-sm">
                                Updated Successfully
                              </p>
                            )}
                            {updateMessage.error && (
                              <p className="text-error text-sm">
                                Something Went wrong
                              </p>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary w-full"
                          >
                            Update Note
                          </button>
                        </form>

                        <form method="dialog" className="mt-4 flex justify-end">
                          {/* if there is a button in form, it will close the modal */}
                          <button
                            className="btn"
                            onClick={() => {
                              setCurrentNote(null);
                              setUpdateMessage({ success: "", error: "" });
                            }}
                          >
                            Close
                          </button>
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

export default ManageNotes;
