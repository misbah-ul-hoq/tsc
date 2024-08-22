import Swal from "sweetalert2";
import api from "../../axios/api";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useDocumentTitle from "dynamic-title-react";

const CreateSession = () => {
  useDocumentTitle("Create Session | TSC");
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
    api
      .post("/study-session", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          reset();
          Swal.fire({
            title: "Created session successfully.",
            icon: "success",
          });
        }
      })
      .catch((err) =>
        Swal.fire({
          title: err.message,
          icon: "error",
        })
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Session Title</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          {...register("sessionTitle", { required: true })}
        />
        {errors.sessionTitle && (
          <span className="text-red-500">Session title is required</span>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Tutor Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={user?.displayName || ""}
          readOnly
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Tutor Email</span>
        </label>
        <input
          type="email"
          className="input input-bordered"
          value={user?.email || ""}
          readOnly
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Session Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          {...register("sessionDescription", { required: true })}
        ></textarea>
        {errors.sessionDescription && (
          <span className="text-red-500">Session description is required</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration Start Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            {...register("registrationStartDate", { required: true })}
          />
          {errors.registrationStartDate && (
            <span className="text-red-500">
              Registration start date is required
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration End Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            {...register("registrationEndDate", { required: true })}
          />
          {errors.registrationEndDate && (
            <span className="text-red-500">
              Registration end date is required
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Start Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            {...register("classStartDate", { required: true })}
          />
          {errors.classStartDate && (
            <span className="text-red-500">Class start date is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Class End Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered"
            {...register("classEndDate", { required: true })}
          />
          {errors.classEndDate && (
            <span className="text-red-500">Class end date is required</span>
          )}
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Session Duration (in hours)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          {...register("sessionDuration", { required: true })}
        />
        {errors.sessionDuration && (
          <span className="text-red-500">Session duration is required</span>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Registration Fee</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={0}
          {...register("registrationFee")}
          readOnly
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select
          className="select select-bordered"
          {...register("status", { required: true })}
        >
          <option value="pending">Pending</option>
        </select>
        {errors.status && (
          <span className="text-red-500">Status is required</span>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CreateSession;
