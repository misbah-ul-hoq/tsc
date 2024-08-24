import { useQuery } from "@tanstack/react-query";
import api from "../../../axios/api";
import { FormEvent, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";

interface User {
  _id: string;
  photoURL: string;
  email: string;
  role: string;
}

const ViewUsers = () => {
  const { user } = useAuth();
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users?email=${user?.email}`);
      return response.data;
    },
  });

  // Use the User type for the selectedUser state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api
      .patch(`/user/${selectedUser?._id}`, {
        role: data.get("role"),
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "User Role Updated successfully",
            icon: "success",
          });
          refetch();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: err.message,
          icon: "error",
        });
      });
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <section className="p-3">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.photoURL}
                    alt={user.email}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUpdateClick(user)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Update Role for {selectedUser.email}
            </h3>
            <div className="py-4">
              <form onSubmit={handleSubmit}>
                <select
                  className="select select-bordered w-full mb-4"
                  name="role"
                >
                  <option
                    value="student"
                    className={`${selectedUser.role == "student" && "hidden"}`}
                  >
                    Make Student
                  </option>
                  <option
                    value="tutor"
                    className={`${selectedUser.role == "tutor" && "hidden"}`}
                  >
                    Make Tutor
                  </option>
                  <option
                    value="admin"
                    className={`${selectedUser.role == "admin" && "hidden"}`}
                  >
                    Make Admin
                  </option>
                </select>
                <button className="btn btn-primary w-full">Save</button>
              </form>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewUsers;
