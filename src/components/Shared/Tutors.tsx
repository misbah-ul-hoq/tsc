import { useEffect, useState } from "react";
import api from "../../axios/api";

type Tutor = {
  _id: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
};

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/users?role=tutor`)
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="container-center">
      <h2 className="text-3xl font-semibold text-center pb-3">Tutors</h2>
      {loading && <span className="loading loading-spinner loading-lg"></span>}
      {!loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tutors.map((tutor: Tutor) => {
            const { _id, role, photoURL, displayName, email } = tutor;
            return (
              <div key={_id} className="">
                <div className="card bg-base-100 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img
                      src={photoURL}
                      alt={`${displayName}'s Photo`}
                      className="rounded-full w-32 h-32 object-cover"
                    />
                  </figure>
                  <div className="card-body pt-4 items-center text-center">
                    <h2 className="card-title">{displayName}</h2>
                    <p className="text-gray-500">{email}</p>
                    <p className="text-gray-500">{displayName}</p>
                    <div className="card-actions">
                      <div className="badge badge-neutral">{role}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Tutors;
