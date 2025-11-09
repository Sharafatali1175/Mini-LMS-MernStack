import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

const StudentDashboard = () => {
  const [profile, setProfile] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const p = await api.get("/students/profile");
      const r = await api.get("/results/my");
      setProfile(p.data);
      setResults(r.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, {profile.name}</h2>
        <p className="mb-4">Email: {profile.email}</p>

        <h3 className="font-semibold mb-2">Your Results</h3>
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Subject</th>
              <th className="p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r._id} className="border-b text-center">
                <td className="p-2">{r.subject}</td>
                <td>{r.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
