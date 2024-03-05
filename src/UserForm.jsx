import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ initialUser, onSubmit }) => {
  const [user, setUser] = useState(initialUser || { name: '', email: '' });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        user
      );
      onSubmit(response.data); // Pass the created user back to App.jsx
      setUser({ name: '', email: '' }); // Clear form after submission
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display an error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialUser ? 'Edit User' : 'Add User'}</h2>
      <label>
        Name:
        <input type="text" name="name" value={user.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </label>
      <button type="submit" disabled={!initialUser}>{initialUser ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default UserForm;

    