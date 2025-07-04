//  page to view, filter, and manage feedback


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaDownload, FaTrash, FaSignOutAlt,FaArrowLeft  } from 'react-icons/fa';




const API_URL = 'http://localhost:5000';

function convertToCSV(data) {
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => `"${obj[header]}"`).join(','));
  return [headers.join(','), ...rows].join('\n');
}

function FeedbackViewPage({ adminMode }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({});
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    const res = await fetch(`${API_URL}/feedbacks`);
    const data = await res.json();
    setFeedbacks(data);
  };

  const fetchStats = async () => {
    const res = await fetch(`${API_URL}/stats`);
    const data = await res.json();
    setStats(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirm) return;

    await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
    fetchFeedbacks();
    fetchStats();
  };


   // TODO: Add export buttons to download feedback as CSV and JSON

  const handleExportCSV = () => {
    if (feedbacks.length === 0) return toast.success("No feedback to export.");
    const csv = convertToCSV(feedbacks);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'feedback.csv';
    link.click();
  };

  const handleExportJSON = () => {
    if (feedbacks.length === 0) return toast.success("No feedback to export.");
    const json = JSON.stringify(feedbacks, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'feedback.json';
    link.click();
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  return (
    <div className="container">
        <button onClick={() => navigate('/')}><FaArrowLeft style={{ marginRight: '6px' }} />Go Back
        </button>


        {adminMode && (
          <button onClick={() => {
           toast.info("Logged out");
           navigate('/admin');
           }}>
           <FaSignOutAlt style={{ marginRight: '5px' }} />
           Logout
          </button>

         )}


      <h1>All Feedback</h1>

      <h2>Statistics</h2>
      <p>Total feedback: {stats.total_feedback || 0}</p>
      <ul>
        {stats.by_category &&
          Object.entries(stats.by_category).map(([cat, count]) => (
            <li key={cat}>{cat}: {count}</li>
          ))}
      </ul>

      <h3>Filter Feedback</h3>
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{ marginRight: '10px', padding: '8px' }}
      >
        <option value="all">All Categories</option>
        <option value="bug">Bug</option>
        <option value="feature">Feature Request</option>
        <option value="general">General</option>
      </select>

      <select
        value={sentimentFilter}
        onChange={(e) => setSentimentFilter(e.target.value)}
        style={{ padding: '8px' }}
      >
        <option value="all">All Sentiments</option>
        <option value="positive">Positive</option>
        <option value="neutral">Neutral</option>
        <option value="negative">Negative</option>
      </select>

      <div style={{ margin: '20px 0' }}>
        <button onClick={handleExportCSV} style={{ marginRight: '10px' }}>
          <FaDownload style={{ marginRight: '5px' }} />
           Export CSV
        </button>

        <button onClick={handleExportJSON}>
          <FaDownload style={{ marginRight: '5px' }} />
          Export JSON
        </button>

      </div>

      <h2>Submitted Feedback</h2>
      <ul>
        {feedbacks
          .filter((fb) => {
            const matchesCategory = categoryFilter === 'all' || fb.category === categoryFilter;
            const matchesSentiment = sentimentFilter === 'all' || fb.sentiment === sentimentFilter;
            return matchesCategory && matchesSentiment;
          })
          .map((fb) => (
            <li key={fb.id} className={fb.sentiment}>
              <strong>{fb.name}</strong> ({fb.category}) — {fb.message}
              <br />
              <small>Sentiment: {fb.sentiment}</small>
              {adminMode && (
                <div>
                  <button onClick={() => handleDelete(fb.id)}> <FaTrash style={{ marginRight: '5px' }} />  Delete
                   </button>

                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FeedbackViewPage;
