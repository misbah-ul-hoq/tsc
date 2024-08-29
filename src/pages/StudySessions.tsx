import { Link } from "react-router-dom";
import useSessions from "../hooks/useSessions";
import sessionType from "../types/sessionType";
import { isCurrentDateSmallerOrEqual } from "../helpers/functions";
import useDocumentTitle from "dynamic-title-react";

const Study = () => {
  const { sessions } = useSessions("approved");
  useDocumentTitle("Study Sessions");
  return (
    <section className="study-card-wrapper container-center py-5">
      <h2 className="text-3xl font-bold text-center mb-5">Sessions</h2>
      {!sessions.length && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sessions.map((session: sessionType) => {
          const {
            _id,
            sessionTitle,
            sessionDescription,
            tutorName,
            registrationEndDate,
          } = session;
          return (
            <div key={_id} className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{sessionTitle}</h2>
                <p>
                  Created by:{" "}
                  <span className="italic font-semibold">{tutorName}</span>
                </p>
                <p>{sessionDescription}</p>
                <p>Registarion ends at: {registrationEndDate}</p>
                <div className="card-actions justify-end mt-4">
                  {isCurrentDateSmallerOrEqual(registrationEndDate) ? (
                    <button className="btn btn-success">Ongoing</button>
                  ) : (
                    <button className="btn btn-warning">Closed</button>
                  )}

                  <Link
                    to={`/study-session/${_id}`}
                    className="btn btn-primary"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Study;
