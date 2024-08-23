import { useForm, SubmitHandler } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import api from "../../axios/api";
import Swal from "sweetalert2";

type FormValues = {
  title: string;
  link: string;
  viewLink: string;
};

const UpdateMaterial = () => {
  const data = useLoaderData();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { _id, title, link, viewLink } = data.data;

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: title,
      link: link,
      viewLink,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    api
      .patch(`/session-materials/${_id}`, {
        title: data.title,
        link: data.link,
        viewLink: data.viewLink,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Updated successfully",
            icon: "success",
          });
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-md m-4 bg-base-200 rounded-lg shadow-lg"
    >
      <div className="form-control mb-4">
        <label className="label" htmlFor="title">
          <span className="label-text">Title</span>
        </label>
        <input
          id="title"
          {...register("title")}
          className="input input-bordered w-full"
          placeholder="Enter title"
        />
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="link">
          <span className="label-text">Link</span>
        </label>
        <input
          id="link"
          {...register("link")}
          className="input input-bordered w-full"
          placeholder="Enter link"
        />
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="viewLink">
          <span className="label-text">View Link</span>
        </label>
        <input
          id="viewLink"
          {...register("viewLink")}
          className="input input-bordered w-full"
          placeholder="Enter view link"
        />
      </div>

      <div className="form-control">
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateMaterial;
