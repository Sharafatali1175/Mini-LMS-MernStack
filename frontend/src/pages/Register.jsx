// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Register = () => {
//   const { register } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     register(formData.name, formData.email, formData.password, formData.role);
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md p-6 rounded w-80 flex flex-col gap-4"
//       >
//         <h2 className="text-xl font-bold text-center">Register</h2>
//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <select
//           name="role"
//           onChange={handleChange}
//           className="border p-2 rounded"
//           value={formData.role}
//         >
//           <option value="student">Student</option>
//           <option value="teacher">Teacher</option>
//         </select>
//         <button className="bg-green-600 text-white p-2 rounded">Register</button>
//         <a href="/login" className="text-sm text-blue-600 text-center">
//           Already have an account?
//         </a>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData.name, formData.email, formData.password, formData.role);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* ✅ Student / Teacher options in unordered list */}
        <ul className=" flex">
          <li className="flex items-center gap-2">
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={handleChange}
            />
            <label htmlFor="student">Student</label>
          </li>
          <li className="flex items-center gap-2 ml-5">
            <input
              type="radio"
              id="teacher"
              name="role"
              value="teacher"
              checked={formData.role === "teacher"}
              onChange={handleChange}
            />
            <label htmlFor="teacher">Teacher</label>
          </li>
        </ul>

        <button className="bg-green-600 text-white p-2 rounded">
          Register
        </button>
        <a href="/login" className="text-sm text-blue-600 text-center">
          Already have an account?
        </a>
      </form>
    </div>
  );
};

export default Register;
