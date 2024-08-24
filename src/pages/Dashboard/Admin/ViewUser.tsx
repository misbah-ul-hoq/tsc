import { useQuery } from "@tanstack/react-query";
import api from "../../../axios/api";
import { useState } from "react";
interface User {
  id: string;
  photoURL: string;
  email: string;
  role: string;
}

const ViewUsers = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users`);
      return response.data;
    },
  });
  console.log(users);

  // Use the User type for the selectedUser state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
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
              <tr key={user.id}>
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
                    className="btn btn-primary"
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
              <select className="select select-bordered w-full mb-4">
                <option>Make Admin</option>
                <option>Make Tutor</option>
              </select>
              <button className="btn btn-primary w-full">Save</button>
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
