
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/exam/auth/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    }
  };

  // Logout
  const Logout = () => {
    toast.success("Logout Successfully");

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Delete User
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/exam/auth/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User deleted successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  // Open Edit Modal
  const handleEdit = (user) => {
    setEditingUser(user._id);

    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  // Update User
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/exam/auth/admin/users/${editingUser}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User updated successfully");

      setEditingUser(null);

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Admin Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Manage all registered users
            </p>
          </div>

          <button
            onClick={Logout}
            className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-slate-400">
              Total Users
            </h3>

            <h2 className="text-4xl font-bold text-white mt-2">
              {users.length}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-slate-400">
              Admins
            </h3>

            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {
                users.filter(
                  (u) => u.role === "admin"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-slate-400">
              Regular Users
            </h3>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              {
                users.filter(
                  (u) => u.role === "user"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-black/30 text-white">
                <tr>
                  <th>#</th>
                  <th>Profile</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-white/5 border-b border-white/10 text-slate-200"
                    >
                      <td>{index + 1}</td>

                      <td>
                        <img
                          src={
                            user.profileimage ||
                            "https://via.placeholder.com/50"
                          }
                          alt="profile"
                          className="w-12 h-12 rounded-full object-cover border border-slate-500"
                        />
                      </td>

                      <td>{user.username}</td>

                      <td>{user.email}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.role === "admin"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-cyan-500/20 text-cyan-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleEdit(user)
                            }
                            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                user._id
                              )
                            }
                            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-8 text-slate-300"
                    >
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-[420px] shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">
                Edit User
              </h2>

              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username:
                      e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-4 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-4 outline-none"
              />

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white mb-6 outline-none"
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setEditingUser(null)
                  }
                  className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

