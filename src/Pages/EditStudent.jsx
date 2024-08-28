import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function EditStudent() {
  const { id } = useParams(); // Extract student id from the URL
  const [student, setStudent] = useState({
    name: '',
    rollno: '',
    address: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the student's current data to pre-fill the form
    axios.get(`https://apis-making.vercel.app/student/getsinglestud/${id}`)
      .then(res => {
        setStudent(res.data);
      })
      .catch(err => {
        console.error("Error fetching student data: ", err);
        toast.error("Failed to load student data. Please try again later.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation checks
    if (!student.name || !student.rollno || !student.address) {
      toast.error("Please fill in all the fields.");
      return;
    }

    axios.put(`https://apis-making.vercel.app/student/updatestudent/${id}`, student)
      .then(() => {
        toast.success(`${student.name}'s details have been updated successfully.`);
        setTimeout(() => {
          navigate("/"); // Navigate back to the student list after a successful update
        }, 2000); // Delay to allow the toast to be seen before navigating
      })
      .catch(err => {
        console.error("Error updating student: ", err);
        toast.error("Failed to update student. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl text-black font-bold mb-6 text-center">Edit Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Roll Number:</label>
            <input
              type="text"
              name="rollno"
              value={student.rollno}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Roll Number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Address:</label>
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Address"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 rounded-md hover:opacity-90 focus:outline-none"
          >
            Update Student
          </button>
        </form>
        <Toaster /> {/* Toast container for displaying notifications */}
      </div>
    </div>
  );
}

export default EditStudent;
