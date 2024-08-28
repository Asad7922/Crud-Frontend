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
    navigate(`/editstudent/${id}`); // Correct template string usage
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
    <div className="container mx-auto px-4 py-4">
      <Toaster /> {/* Add Toaster component for showing toasts */}
      <div className="flex flex-col sm:flex-row justify-between items-center my-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Student List</h1>
        <Link to="/addstudent">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
            Add Student
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-sm sm:text-base">Name</th>
              <th className="py-2 px-4 text-left text-sm sm:text-base">Roll No</th>
              <th className="py-2 px-4 text-left text-sm sm:text-base">Address</th>
              <th className="py-2 px-4 text-left text-sm sm:text-base">Edit</th>
              <th className="py-2 px-4 text-left text-sm sm:text-base">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-2 px-4 text-sm sm:text-base">{student.name}</td>
                  <td className="py-2 px-4 text-sm sm:text-base">{student.rollno}</td>
                  <td className="py-2 px-4 text-sm sm:text-base">{student.address}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEdit(student._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all text-sm sm:text-base"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(student._id)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 text-center text-sm sm:text-base">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoList;
