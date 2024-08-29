import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../axios/api";
import Swal from "sweetalert2";

const CreateNote = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    api
      .post(`/create-note`, {
        email: data?.email,
        title: data?.title,
        description: data?.description,
      })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Created note successfully",
            icon: "success",
          });
          reset();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: err.message,
          icon: "error",
        });
        reset();
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Create a Note</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email (read-only)
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          readOnly
          className="input input-bordered w-full"
          value={user?.email as string} // Replace with the actual email value
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">Email is required</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
          placeholder="Enter the title of the note"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">Title is required</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Enter the description of the note"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">Description is required</p>
        )}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary w-full md:w-auto">
          Create Note
        </button>
      </div>
    </form>
  );
};

export default CreateNote;
