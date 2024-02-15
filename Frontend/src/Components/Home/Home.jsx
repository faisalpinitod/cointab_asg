import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUserToDatabase = async (user) => {
    try {
      console.log(user)
      const response = await fetch('https://cointab-26xs.onrender.com/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding user to database:', error);
    }
  };
  

  return (
    <div>
      <h1>Cointab SE-ASSIGNMENT</h1>
      <button onClick={fetchUsers}>All Users</button>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>City: {user.address.city}</p>
            <p>Company: {user.company.name}</p>
            <button onClick={() => { addUserToDatabase(user); }}>Add</button>
            <Link to={`/post/${user.id}`}>
              <button>Open</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
