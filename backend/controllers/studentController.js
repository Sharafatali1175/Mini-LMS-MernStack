import User from "../models/User.js";

export const getAllStudents = async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password");
  res.json(students);
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
