// import mongoose from "mongoose";
// import Result from "../models/Result.js";
// import User from "../models/User.js"

// export const addResult = async (req, res) => {
//   try {
//     const { student, subject, marks } = req.body;

//     const foundStudent = await User.findById(student);
//     if (!foundStudent || foundStudent.role !== "student") {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const result = await Result.create({
//       student: foundStudent._id,
//       subject,
//       marks,
//       teacher: req.user._id,
//     });

//     const populatedResult = await Result.findById(result._id)
//       .populate("student", "name email")
//       .populate("teacher", "name email");

//     res.status(201).json(populatedResult);
//   } catch (error) {
//     console.error("Error in addResult:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const getResults = async (req, res) => {
//   try {
//     const results = await Result.find()
//       .populate("student", "name email")
//       .populate("teacher", "name email");

//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Error in getResults:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const getMyResults = async (req, res) => {
//   try {
//     const studentId = req.user._id;
//     const results = await Result.find({ student: studentId })
//       .populate("student", "name email")
//       .populate("teacher", "name email");

//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Error in getMyResults:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const updateResult = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { subject, marks } = req.body;

//     const result = await Result.findById(id);
//     if (!result) return res.status(404).json({ message: "Result not found" });

//     if (result.teacher.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Not authorized to edit this result" });
//     }

//     result.subject = subject || result.subject;
//     result.marks = marks || result.marks;
//     await result.save();

//     const updated = await Result.findById(id)
//       .populate("student", "name email")
//       .populate("teacher", "name email");

//     res.status(200).json(updated);
//   } catch (error) {
//     console.error("Error in updateResult:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const deleteResult = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await Result.findById(id);
//     if (!result) return res.status(404).json({ message: "Result not found" });

//     if (result.teacher.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Not authorized to delete this result" });
//     }

//     await result.deleteOne();
//     res.status(200).json({ message: "Result deleted successfully" });
//   } catch (error) {
//     console.error("Error in deleteResult:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

import Result from "../models/Result.js";
import User from "../models/User.js";

// 🟢 Add Result
export const addResult = async (req, res) => {
  try {
    const { student, subject, marks } = req.body;

    const foundStudent = await User.findById(student);
    if (!foundStudent || foundStudent.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const result = await Result.create({
      student: foundStudent._id,
      subject,
      marks,
      teacher: req.user._id,
    });

    const populatedResult = await Result.findById(result._id)
      .populate("student", "name email")
      .populate("teacher", "name email");

    res.status(201).json(populatedResult);
  } catch (error) {
    console.error("Error in addResult:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Get All Results (Teacher)
export const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student", "name email")
      .populate("teacher", "name email");

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in getResults:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Get Student’s Own Results
export const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id })
      .populate("student", "name email")
      .populate("teacher", "name email");

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in getMyResults:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟡 Update Result (Teacher Only)
export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, marks } = req.body;

    const result = await Result.findById(id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    // ✅ Teacher authorization check
    if (result.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this result" });
    }

    // ✅ Update fields
    if (subject !== undefined) result.subject = subject;
    if (marks !== undefined) result.marks = marks;

    await result.save();

    const updated = await Result.findById(id)
      .populate("student", "name email")
      .populate("teacher", "name email");

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateResult:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Delete Result (Teacher Only)
export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    // ✅ Only the teacher who created can delete
    if (result.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this result" });
    }

    await Result.findByIdAndDelete(id);
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Error in deleteResult:", error);
    res.status(500).json({ message: error.message });
  }
};