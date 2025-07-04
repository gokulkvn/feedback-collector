import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPaperPlane } from 'react-icons/fa';


const API_URL = 'http://localhost:5000';

function FeedbackFormPage({ setAdminMode }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAdminMode(false); 
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = { name, category, message };

    const res = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });

    if (res.ok) {
      toast.success('Feedback submitted!');
      setName('');
      setCategory('general');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h1>Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="bug">Bug</option>
          <option value="feature">Feature Request</option>
          <option value="general">General</option>
        </select>
        <textarea
          placeholder="Your feedback"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit"> <FaPaperPlane style={{ marginRight: '6px' }} /> Submit
         </button>

      </form>
    </div>
  );
}

export default FeedbackFormPage;
