import { useParams } from "react-router-dom";
import useSession from "../hooks/useSession";
import useDocumentTitle from "dynamic-title-react";
import useRole from "../hooks/useRole";
import { isCurrentDateSmallerOrEqual } from "../helpers/functions";

const SessionDetails = () => {
  const params = useParams();
  const { role } = useRole();
  console.log(params.id);
  const { data } = useSession(params.id as string);
  useDocumentTitle("Details Page");

  console.log(data);
  if (!data) return <span className="loading loading-dots loading-lg"></span>;

  const {
    _id,
    sessionTitle,
    sessionDescription,
    status,
    tutorEmail,
    tutorName,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    registrationFee,
    sessionDuration,
  } = data;

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
            <button
              className={`btn ${
                !isCurrentDateSmallerOrEqual(registrationEndDate) &&
                "btn-disabled"
              } ${role != "student" && "btn-disabled"}`}
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
              <div className="">
                <h4 className="text-lg font-semibold">
                  Reviewer name goes here
                </h4>
                <p className="text-sm text-gray-600">Rating: 3 / 5</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ratione ullam asperiores tempore impedit atque quam magni id
                  nisi sint cupiditate, qui odit deleniti dolorem aliquam?
                  Deserunt esse impedit sed ad!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
