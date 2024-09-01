import { useNavigate, useParams } from "react-router-dom";
import useSession from "../hooks/useSession";
import useDocumentTitle from "dynamic-title-react";
import useRole from "../hooks/useRole";
import { isCurrentDateSmallerOrEqual } from "../helpers/functions";
import { useAuth } from "../hooks/useAuth";
import api from "../axios/api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const SessionDetails = () => {
  const params = useParams();
  const { role } = useRole();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: review = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const response = await api.get(`/ratings/${params.id}`);
      return response.data;
    },
  });

  const { data } = useSession(params.id as string);
  useDocumentTitle("Details Page");

  if (!data) return <span className="loading loading-dots loading-lg"></span>;

  const {
    _id,
    sessionTitle,
    sessionDescription,
    //status,
    tutorEmail,
    tutorName,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    registrationFee,
    sessionDuration,
  } = data;

  const handleFreeRegister = () => {
    setLoading(true);
    api
      .post(`/booked-sessions`, {
        sessionId: _id,
        sessionTitle,
        sessionDescription,
        tutorEmail,
        tutorName,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        registrationFee,
        sessionDuration,
        studentName: user?.displayName,
        studentEmail: user?.email,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Booked successfully",
            icon: "success",
          });
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        Swal.fire({
          title:
            err.response?.status == 409
              ? "You have already applied for this session"
              : err.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-3xl shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center">
            Session Details
          </h2>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Title:</h3>
            <p className="text-base">{sessionTitle}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Tutor Name:</h3>
            <p className="text-base">{tutorName}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Tutor Email:</h3>
            <p className="text-base">{tutorEmail}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Average Rating:</h3>
            <p className="text-base">Will come soon {}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Description:</h3>
            <p className="text-base">{sessionDescription}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">
                Registration Start Date:
              </h3>
              <p className="text-base">{registrationStartDate}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Registration End Date:</h3>
              <p className="text-base">{registrationEndDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Class Start Date: </h3>
              <p className="text-base">{classStartDate}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Class End Date:</h3>
              <p className="text-base">{classEndDate}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Duration:</h3>
            <p className="text-base">{sessionDuration} hours</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Registration Fee:</h3>
            <p className="text-base">
              {registrationFee > 0 ? `${registrationFee + " Taka"}` : "Free"}
            </p>
          </div>

          <div className="mt-4 button-wrapper">
            {loading && (
              <span className="loading loading-infinity block loading-lg text-purple-600"></span>
            )}
            <button
              className={`btn ${
                !isCurrentDateSmallerOrEqual(registrationEndDate) &&
                "btn-disabled"
              } ${role != "student" && "btn-disabled"}`}
              onClick={() => {
                if (registrationFee == 0) {
                  handleFreeRegister();
                } else {
                  navigate(`/payment/${params.id}`);
                }
              }}
            >
              {!isCurrentDateSmallerOrEqual(registrationEndDate)
                ? "Registration Closed"
                : "Book Now"}
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-center">Reviews</h2>
            <div className="space-y-4 mt-4">
              {/* {reviews.map((review, index) => (
                <div key={index} className="p-4 bg-base-100 rounded shadow">
                  <h4 className="text-lg font-semibold">{review.reviewerName}</h4>
                  <p className="text-sm text-gray-600">Rating: {review.rating} / 5</p>
                  <p>{review.comment}</p>
                </div>
              ))} */}
              {review.map(
                (item: {
                  _id: string;
                  reviewText: string;
                  rating: number;
                  sessionId: string;
                  studentName: string;
                }) => {
                  return (
                    <div key={item._id} className="space-y-1">
                      <h4 className="text-lg font-semibold">
                        {item.studentName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Rating: {item.rating} / 5
                      </p>
                      <p>{item.reviewText}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
