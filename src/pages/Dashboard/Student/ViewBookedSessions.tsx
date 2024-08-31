import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../axios/api";
import sessionType from "../../../types/sessionType";
import { Link } from "react-router-dom";

const ViewBookedSessions = () => {
  const { user } = useAuth();
  const { data: sessions } = useQuery({
    queryKey: ["booked-sessions"],
    queryFn: async () => {
      const response = await api.get(`/booked-sessions/${user?.email}`);
      return response.data;
    },
  });
  console.log(sessions);
  if (!sessions)
    return <span className="loading loading-spinner loading-md"></span>;

  return (
    <section className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sessions.map((session: sessionType) => {
        const { _id, sessionTitle, sessionDescription } = session;
        return (
          <div key={_id} className="card card-compact bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{sessionTitle}</h2>
              <p>{sessionDescription}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/dashboard/session-review/${_id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ViewBookedSessions;
