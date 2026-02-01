import React, { useState, useEffect } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Role</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">
                    <span className="pill capitalize">{user.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    {user.role !== "admin" && (
                      <button className="btn-ghost text-sm">Make fraud</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
