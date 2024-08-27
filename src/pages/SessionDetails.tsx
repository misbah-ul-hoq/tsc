import { useParams } from "react-router-dom";
import useSession from "../hooks/useSession";

const SessionDetails = () => {
  const params = useParams();
  console.log(params.id);
  const { data } = useSession(params.id as string);
  console.log(data);
  if (!data) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-3xl shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center">
            Session Details
          </h2>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Title:</h3>
            <p className="text-base">{session.title}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Tutor Name:</h3>
            <p className="text-base">{session.tutorName}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Average Rating:</h3>
            <p className="text-base">{session.averageRating}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Description:</h3>
            <p className="text-base">{session.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">
                Registration Start Date:
              </h3>
              <p className="text-base">{session.registrationStartDate}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Registration End Date:</h3>
              <p className="text-base">{session.registrationEndDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Class Start Time:</h3>
              <p className="text-base">{session.classStartTime}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Class End Date:</h3>
              <p className="text-base">{session.classEndDate}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Duration:</h3>
            <p className="text-base">{session.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
