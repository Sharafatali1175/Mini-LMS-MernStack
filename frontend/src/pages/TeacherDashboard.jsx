
import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import ResultForm from "../components/ResultForm";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);

  const fetchStudents = async () => {
    const { data } = await api.get("/students");
    setStudents(data);
  };

  const fetchResults = async () => {
    const { data } = await api.get("/results");
    setResults(data);
  };

  useEffect(() => {
    fetchStudents();
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await api.delete(`/results/${id}`);
        fetchResults();
      } catch (error) {
        console.error("Error deleting result:", error.response?.data || error.message);
        alert("Failed to delete result.");
      }
    }
  };

  const handleEdit = async (result) => {
    const newMarks = prompt("Enter new marks:", result.marks);
    if (newMarks === null) return; // Cancelled
    await api.put(`/results/${result._id}`, {
      subject: result.subject,
      marks: newMarks,
    });
    fetchResults();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">All Students</h3>
            <ul className="bg-white rounded shadow p-3">
              {students.map((s) => (
                <li key={s._id} className="border-b py-1">
                  {s.name} ({s.email})
                </li>
              ))}
            </ul>
          </div>

          <ResultForm onSuccess={fetchResults} />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">All Results</h3>
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Student</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Marks</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r._id} className="border-b text-center">
                  <td className="p-2">{r.student?.name}</td>
                  <td>{r.subject}</td>
                  <td>{r.marks}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(r)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
