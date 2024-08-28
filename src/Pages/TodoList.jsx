import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function TodoList() {
  const [students, setStudents] = useState([]); // Initialize with an empty array
  const navigate = useNavigate();

  const fetchStudents = () => {
    axios.get("https://apis-making.vercel.app/student/getallstudent")
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.error("Something went wrong: ", err);
        toast.error("Failed to load students. Please try again later."); // User-friendly error message
      });
  };

  useEffect(() => {
    // Fetching all students from the backend
    fetchStudents(); // Call fetchStudents on component mount
  }, []);

  const handleEdit = (id) => {
    navigate(`/editstudent/${id}`); // Navigate to the edit page
  };

  const handleDelete = (id) => {
      axios.delete(`https://apis-making.vercel.app/student/deletesinglestud/${id}`) // Corrected endpoint format
        .then(() => {
          // Fetch students again to refresh the list
          fetchStudents(); // Re-fetch students to update the list
          toast.success("Student deleted successfully.");
        })
        .catch(err => {
          console.error("Error deleting student: ", err);
          toast.error("Failed to delete student. Please try again.");
        });
    
  };

  return (
    <div className="container mx-auto px-4">
      <Toaster /> {/* Add Toaster component for showing toasts */}
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold">Student List</h1>
        <Link to="/addstudent">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Student</button>
        </Link>
      </div>
      
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Roll No</th>
            <th className="py-2 px-4 text-left">Address</th>
            <th className="py-2 px-4 text-left">Edit</th>
            <th className="py-2 px-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.rollno}</td>
                <td className="py-2 px-4">{student.address}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEdit(student._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(student._id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
