import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function AddStudent() {
  const [student, setStudent] = useState({
    name: '',
    rollno: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://apis-making.vercel.app/student/addstudent", student)
      .then(() => {
        toast.success(`${student.name} has been added successfully.`);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Delay to allow the toast to be seen before navigating
      })
      .catch(err => {
        console.error("Error adding student: ", err);
        toast.error("Failed to add student. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl text-black font-bold mb-6 text-center">Add New Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Address"
              required
            />
          </div>
         
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-black py-2 rounded-md hover:opacity-90 focus:outline-none"
          >
            Add Student
          </button>
        </form>
        <Toaster /> {/* Toast container for displaying notifications */}
      </div>
    </div>
  );
}

export default AddStudent;
