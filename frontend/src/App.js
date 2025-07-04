// TODO: Add toastify notifications and react-icons

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackFormPage from './pages/FeedbackFormPage';
import AdminLoginPage from './pages/AdminLoginPage';
import FeedbackViewPage from './pages/FeedbackViewPage';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [adminMode, setAdminMode] = useState(false);

  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/admin" style={{ marginRight: '10px' }}>Admin Login</Link>
          <Link to="/feedbacks">View Feedback</Link>
        </nav>

        <Routes>
          <Route path="/" element={<FeedbackFormPage setAdminMode={setAdminMode} />} />
          <Route path="/admin" element={<AdminLoginPage setAdminMode={setAdminMode} />} />
          <Route path="/feedbacks" element={<FeedbackViewPage adminMode={adminMode} />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
