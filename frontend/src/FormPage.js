import React, { useState, useEffect } from 'react';  //store and update values (like variables).
                                            //run code when the component loads or when something changes.
import { useNavigate } from 'react-router-dom';
                                      //move (navigate) to a different page using code
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
const navigate = useNavigate();
const handleLogout = () => 
          {localStorage.removeItem('token');
          navigate('/login');};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//_________________________________________________________________________________________________
  //This runs when the user submits a form. It sends new data to the backend
 const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Use deployed backend URL (not localhost)
  const res = await fetch('https://ffcs-xchanger-1.onrender.com/api/auth/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // 🔒 Auth token
    },
    body: JSON.stringify(formData),
  });

  const newData = await res.json(); // 🟢 New content returned from backend
  setRequests([newData, ...requests]); // 🖼️ Show new data in UI immediately

  // 🔄 Clear the form after submission
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
};

//___________________________________________________________________________________
//This runs automatically when the page loads. It fetches all data already submitted.
  useEffect(() => { 
    fetch('https://ffcs-xchanger-1.onrender.com/api/auth/content', {         //	Sends a GET request to backend to fetch all submitted form data
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // 🔒 include token
      },                  //"Bearer" is a standard way to send tokens in APIs.
    })
      .then((res) => res.json())            //Converts the response into JSON format and stored in (data)
      .then((data) => setRequests(data))           //Stores the fetched data into Requests
      .catch((err) => console.error(err));        
  }, []);
//___________________________________________________________________________________

const [selectedDept, setSelectedDept] = useState('');

const filteredRequests = selectedDept
  ? requests.filter((r) => r.department === selectedDept)
  : [];

const departments = ['CSE', 'ECE', 'ECM', 'AIDS', 'AIML', 'IT', 'EEE', 'Mech', 'Civil'];


  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '10px' }}>
       Logout
       </button>
      <h2>Faculty Slot Change Request</h2>
      <form onSubmit={handleSubmit}>                    {/* formdata update*/}
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
