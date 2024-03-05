import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ users, onSelectUser }) => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) -
            <button onClick={() => onSelectUser(user)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
