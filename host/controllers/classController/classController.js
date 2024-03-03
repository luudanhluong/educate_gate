import classRepository from "../../repositories/class/index.js";
import classDAO from "../../repositories/class/index.js";
const createNewListClass = async (req, res) => {
  try {
    const { suffName, preName, quantity, limmitStudent } = req.body;
    const result = await classRepository.createNewListClass({
      suffName: suffName.toUpperCase(),
      preName: preName.toUpperCase(),
      quantity,
      limmitStudent,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getClasses = async (req, res, next) => {
  try {
    const { item, order, limit, skip } = req.query;
    const result = await classRepository.getClasses({
      item,
      order: Number(order),
      limit,
      skip,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentInClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const students = await classDAO.getStudentsInClass(classId);
    if (!students || students.length === 0) {
      return res.status(404).json({
        message: "No students found for the class or class not found",
      });
    }
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students for class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default {
  createNewListClass,
  getClasses,
  getStudentInClass,
};
