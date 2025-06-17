import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Daftar Pengguna</h1>
      <input
        type="text"
        placeholder="Cari berdasarkan nama..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul className="user-list">
          {filteredUsers.map(user => (
            <li key={user.id} onClick={() => setSelectedUser(user)}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="user-detail">
          <h2>Detail Pengguna</h2>
          <p><strong>Nama:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Telepon:</strong> {selectedUser.phone}</p>
          <p><strong>Website:</strong> {selectedUser.website}</p>
          <p><strong>Alamat:</strong> {selectedUser.address.street}, {selectedUser.address.city}</p>
          <button onClick={() => setSelectedUser(null)}>Tutup</button>
        </div>
      )}
    </div>
  );
}

export default App;