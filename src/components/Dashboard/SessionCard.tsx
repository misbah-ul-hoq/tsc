import Swal from "sweetalert2";
import api from "../../axios/api";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface dataProps {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  status: string;
  showUploadMaterialsBtn?: boolean;
  tutorEmail: string;
}

type FormValues = {
  title: string;
  sessionId: string;
  tutorEmail: string;
  image: FileList;
  link: string;
};

const SessionCard = ({
  data,
  showUploadMaterialsBtn,
}: {
  data: dataProps;
  showUploadMaterialsBtn?: boolean;
}) => {
  const { _id, sessionTitle, sessionDescription, status, tutorEmail } = data;

  const [isUploading, setUploading] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const { image, link, sessionId, tutorEmail, title } = data;
    const imageFile = image[0];

    const formData = new FormData();
    formData.append("image", imageFile);
    setUploading(true);

    // first of all send the image to the imgbb server.
    axios
      .post(`https://api.imgbb.com/1/upload`, formData, {
        params: { key: import.meta.env.VITE_IMGBB },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      //after getting the image from the imgbb server, send a req to the backend with that image link
      .then((res) => {
        if (res.data.success) {
          api
            .post(`/session-materials`, {
              sessionId,
              tutorEmail,
              title,
              link,
              viewLink: res.data.data.display_url,
            })
            .then((res) => {
              if (res.data.acknowledged) {
                setUploading(false);
                setShowSuccessText(true);
                reset();
              }
            })
            .catch(() => {
              setUploading(false);
              setShowSuccessText(false);
            });
        }
      });
  };

  const handleApply = () => {
    api.patch(`/study-session/${_id}`, { status: "pending" }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Re apply successfully",
          icon: "success",
        });
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
            className={`btn btn-sm ${
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
              className="btn btn-sm btn-secondary"
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
              <button
                className="btn btn-sm btn-accent"
                onClick={() =>
                  document?.getElementById("my_modal_1")?.showModal()
                }
              >
                Upload materials
              </button>
              <dialog
                id="my_modal_1"
                className="modal z-50 max-h-screen min-h-fit"
              >
                <div className="modal-box p-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input
                        type="text"
                        {...register("title", { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-xs mt-1">
                          Title is required.
                        </p>
                      )}
                    </div>

                    {/* Study Session ID (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium">
                        Study Session ID
                      </label>
                      <input
                        type="text"
                        value={_id}
                        readOnly
                        {...register("sessionId")}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                      />
                    </div>

                    {/* Tutor Email (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium">
                        Tutor Email
                      </label>
                      <input
                        type="email"
                        value={tutorEmail}
                        readOnly
                        {...register("tutorEmail")}
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium">
                        Image Upload
                      </label>
                      <input
                        type="file"
                        {...register("image", { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.image && (
                        <p className="text-red-500 text-xs mt-1">
                          Image is required.
                        </p>
                      )}
                    </div>

                    {/* Google Drive Link */}
                    <div>
                      <label className="block text-sm font-medium">
                        Google Drive Link
                      </label>
                      <input
                        type="url"
                        {...register("link", {
                          required: true,
                          pattern: /^https:\/\/drive\.google\.com\/.*/,
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.link && (
                        <p className="text-red-500 text-xs mt-1">
                          Valid Google Drive link is required.
                        </p>
                      )}
                    </div>

                    {/* loadin Button */}
                    {isUploading && (
                      <span className="loading loading-spinner loading-md"></span>
                    )}

                    {/* success message button */}
                    {showSuccessText && (
                      <p className="text-success">
                        Materials uploaded successfully
                      </p>
                    )}

                    {/* submit button */}
                    <div>
                      <button
                        disabled={isUploading}
                        type="submit"
                        className="btn btn-sm btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm" onClick={() => reset()}>
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
