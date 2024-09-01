import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../axios/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type FormValues = {
  title: string;
  sessionId: string;
  tutorEmail: string;
  image: FileList;
  link: string;
};

const UploadMaterialsDetails = () => {
  const [isUploading, setUploading] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["upload-materials"],
    queryFn: async () => {
      const response = await api.get(`/study-session/${params.id}`);
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  if (!data)
    return (
      <span className="loading loading-lg loading-spinner text-purple-700"></span>
    );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { image, link, sessionId, tutorEmail, title } = data;
    const imageFile = image[0];
    setShowSuccessText(false);

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
  return (
    <div className="p-4">
      <h2 className="text-purple-700 font-bold text-2xl mb-5">
        {" "}
        Upload Materials for {data?.sessionTitle}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="mt-1 block w-full input input-bordered input-primary"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">Title is required.</p>
          )}
        </div>

        {/* Study Session ID (Read-only) */}
        <div>
          <label className="block font-medium">Study Session ID</label>
          <input
            type="text"
            value={data?._id}
            readOnly
            {...register("sessionId")}
            className="mt-1 block w-full input input-bordered input-primary"
          />
        </div>

        {/* Tutor Email (Read-only) */}
        <div>
          <label className="block font-medium">Tutor Email</label>
          <input
            type="email"
            value={data?.tutorEmail}
            readOnly
            {...register("tutorEmail")}
            className="mt-1 block w-full input input-bordered input-primary"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Image Upload</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="mt-1 block w-full file-input file-input-bordered"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">Image is required.</p>
          )}
        </div>

        {/* Google Drive Link */}
        <div>
          <label className="block font-medium">Google Drive Link</label>
          <input
            type="url"
            {...register("link", {
              required: true,
              pattern: /^https:\/\/drive\.google\.com\/.*/,
            })}
            className="mt-1 block w-full input input-bordered input-primary"
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
          <p className="text-success">Materials uploaded successfully</p>
        )}

        {/* submit button */}
        <div>
          <button
            disabled={isUploading}
            type="submit"
            className="btn btn-secondary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMaterialsDetails;
