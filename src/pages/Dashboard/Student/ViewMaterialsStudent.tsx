import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../axios/api";
import { bookedSession } from "../../../types/sessionType";
import { Link } from "react-router-dom";

const ViewMaterialsStudent = () => {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["booked-sessions"],
    queryFn: async () => {
      const response = await api.get(`/booked-sessions/${user?.email}`);
      return response.data;
    },
  });
  if (!data)
    return (
      <span className="loading loading-spinner loading-lg text-primary"></span>
    );
  console.log(data);
  return (
    <section className="p-4">
      <h2 className="text-2xl font-medium text-center">Booked Sessions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item: bookedSession) => {
          const { sessionId, sessionTitle, sessionDescription } = item;
          return (
            <div
              key={sessionId}
              className="card card-compact bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">{sessionTitle}</h2>
                <p>{sessionDescription}</p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/dashboard/view-materials/${sessionId}`}
                    className="btn btn-accent"
                  >
                    View Materials
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

export default ViewMaterialsStudent;
