// Admin login with hardcoded credentials
// TODO: Add logout functionality on button

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaLock, FaArrowLeft } from 'react-icons/fa';


function AdminLoginPage({ setAdminMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setAdminMode(true);
      navigate('/feedbacks');
    } else {
      toast.success('Wrong credentials');
    }
  };

  return (
    <div className="container">
      <h2><FaLock style={{ marginRight: '8px' }} /> Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <button onClick={() => navigate('/')}><FaArrowLeft style={{ marginRight: '6px' }} />Go Back
              </button>

    </div>
  );
}

export default AdminLoginPage;
