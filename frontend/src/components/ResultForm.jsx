
import { useState, useEffect } from "react";
import api from "../utils/api";

const ResultForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    marks: "",
  });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get("/students");
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/results", formData);
      setFormData({ student: "", subject: "", marks: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding result:", error);
      alert("Failed to add result.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md flex flex-col gap-2 w-full md:w-1/2"
    >
      <select
        name="student"
        value={formData.student}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name} ({s.email})
          </option>
        ))}
      </select>

      <input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="border p-2 rounded"
        required
      />
      <input
        name="marks"
        value={formData.marks}
        onChange={handleChange}
        placeholder="Marks"
        type="number"
        className="border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add Result
      </button>
    </form>
  );
};

export default ResultForm;
