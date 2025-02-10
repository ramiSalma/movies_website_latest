import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, deleteUser, updateUser } from "./ReducerThunk";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser());
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleUpdateUser = (id) => {
    dispatch(updateUser({ id, name: editName, username: "updateduser", email: "updated@example.com" }));
    setEditUserId(null); // Exit edit mode after updating
  };

  return (
    <div>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <button onClick={handleAddUser} style={{ marginBottom: "10px" }}>➕ Add User</button>

      {!loading && !error && users.length > 0 && (
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {editUserId === user.id ? (
                    <button onClick={() => handleUpdateUser(user.id)}>💾 Save</button>
                  ) : (
                    <button onClick={() => { setEditUserId(user.id); setEditName(user.name); }}>✏️ Edit</button>
                  )}
                  <button onClick={() => handleDeleteUser(user.id)} style={{ marginLeft: "5px" }}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
