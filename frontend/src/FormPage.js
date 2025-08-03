import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subject: '',
    currentFaculty: '',
    currentSlot: '',
    desiredFaculty: '',
    desiredSlot: '',
  });

  
  const [requests, setRequests] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const navigate = useNavigate();

  const departments = ['CSE', 'ECE', 'ECM', 'AIDS', 'AIML', 'IT', 'EEE', 'Mech', 'Civil'];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const res = await fetch('https://ffcs-xchanger-1.onrender.com/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error submitting form:", error.message);
        alert("Submission failed: " + error.message);
        return;
      }

      const newData = await res.json();
      console.log("Submitted successfully:", newData);

      setRequests([newData, ...requests]);
      setFormData({
        name: '',
        email: '',
        department: '',
        subject: '',
        currentFaculty: '',
        currentSlot: '',
        desiredFaculty: '',
        desiredSlot: '',
      });

      alert("✅ Successfully added!");
      window.alert("Submission successful!");
    } catch (err) {
      console.error("Network error:", err);
      alert("Server not reachable or down.");
    }
  };

  useEffect(() => {
    fetch('https://ffcs-xchanger-1.onrender.com/api/content', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredRequests = selectedDept
    ? requests.filter((r) => r.department === selectedDept)
    : [];

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '10px' }}>
        Logout
      </button>
      <h2>Faculty Slot Change Request</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Student Name" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Contact Email" type="email" required />
        <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
        <input name="currentFaculty" value={formData.currentFaculty} onChange={handleChange} placeholder="Current Faculty" required />
        <input name="currentSlot" value={formData.currentSlot} onChange={handleChange} placeholder="Current Slot" required />
        <input name="desiredFaculty" value={formData.desiredFaculty} onChange={handleChange} placeholder="Desired Faculty" required />
        <input name="desiredSlot" value={formData.desiredSlot} onChange={handleChange} placeholder="Desired Slot" required />
        <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
      </form>

      

      <div>
        <h3 style={{ marginTop: '30px' }}>Submitted Requests</h3>

        <label htmlFor="dept-select">Select Department: </label>
        <select
          id="dept-select"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{ marginBottom: '20px' }}
        >
          <option value="">--Choose Department--</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        {selectedDept && (
          <>
            <h4>{selectedDept} Department Requests</h4>
            <ul>
              {filteredRequests.length === 0 ? (
                <li>No requests yet in {selectedDept}</li>
              ) : (
                filteredRequests.map((r) => (
                  <li key={r._id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <strong>{r.name}</strong> ({r.email})<br />
                    Subject: {r.subject}<br />
                    Current: {r.currentFaculty} - {r.currentSlot}<br />
                    Desired: {r.desiredFaculty} - {r.desiredSlot}
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default FormPage;
