// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import api from "../../../axios/api";

// const SessionReview = () => {
//   const params = useParams();

//   const { data: session } = useQuery({
//     queryKey: ["session-review"],
//     queryFn: async () => {
//       const response = await api.get(`/booked-sessions/?id=${params.id}`);
//       return response.data;
//     },
//   });
//   console.log(session);
//   return <div>SessionReview</div>;
// };

// export default SessionReview;

import { useQuery } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../../../axios/api";
import Swal from "sweetalert2";

const SessionReview = () => {
  const params = useParams();

  const { data: session = {} } = useQuery({
    queryKey: ["session-review"],
    queryFn: async () => {
      const response = await api.get(`/booked-sessions/?id=${params.id}`);
      return response.data;
    },
  });
  const {
    sessionTitle,
    sessionDescription,
    sessionId,
    studentName,
    sessionDuration,
    tutorName,
    registrationStartDate,
    registrationEndDate,
    registrationFee,
  } = session;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { reviewText, rating } = data;
    try {
      const response = await api.post(`/ratings`, {
        reviewText,
        rating: parseInt(rating),
        sessionId,
      });
      if (response.data.acknowledged) {
        Swal.fire({
          title: "Review added successfully",
          icon: "success",
        });
      }
    } catch {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
      });
      //
    } finally {
      //
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body px-8">
          <h2 className="card-title text-2xl font-bold">{sessionTitle}</h2>
          <p className="text-gray-700">{sessionDescription}</p>
          <div className="flex flex-col md:flex-row mt-4 justify-between">
            <div>
              <span className="font-bold">Session ID:</span> {sessionId}
            </div>
            <div>
              <span className="font-bold">Duration:</span> {sessionDuration}{" "}
              hours
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4 justify-between">
            <div>
              <span className="font-bold">Student:</span> {studentName}
            </div>
            <div>
              <span className="font-bold">Tutor:</span> {tutorName}
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4 justify-between">
            <div>
              <span className="font-bold">Registration Start:</span>{" "}
              {registrationStartDate}
            </div>
            <div>
              <span className="font-bold">Registration End:</span>{" "}
              {registrationEndDate}
            </div>
          </div>
          {registrationFee === 0 ? (
            <span className="badge badge-success mt-4">Free Registration</span>
          ) : (
            <span className="badge badge-primary mt-4">
              Fee: ${registrationFee}
            </span>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Review </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              {...register("reviewText", { required: true })}
            ></textarea>
            {errors.reviewText && (
              <p className="text-red-500 mt-1">Review text is required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <select
              className="select select-bordered"
              {...register("rating", { required: true })}
            >
              <option value="">Select a rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            {errors.rating && (
              <p className="text-red-500 mt-1">Rating is required</p>
            )}
          </div>
          <button className="btn btn-primary mt-4">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default SessionReview;
