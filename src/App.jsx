import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import axios from 'axios'; // Import Axios for API requests

const App = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]); // Update users locally (optimistic update)
    setSelectedUser(null); // Clear selected user after adding
  };

  const handleEditUser = async (editedUser) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editedUser.id}`, editedUser);
      setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user))); // Update users locally
      setSelectedUser(null); // Clear selected user after editing
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display an error message
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) {
      return; // Prevent deletion if no user is selected
    }
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`);
      setUsers(users.filter((user) => user.id !== selectedUser.id)); // Update users locally
      setSelectedUser(null); // Clear selected user after deletion
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display an error message
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Update selected user state
  };

  return (
    <div className="App">
      <h1>User CRUD</h1>
      <UserList users={users} onSelectUser={handleSelectUser} />
      {selectedUser ? (
        <UserForm initialUser={selectedUser} onSubmit={handleEditUser} />
      ) : (
        <UserForm onSubmit={handleAddUser} />
      )}
      <button onClick={handleDeleteUser} disabled={!selectedUser}>Delete</button> // Delete button
    </div>
  );
};

export default App;
