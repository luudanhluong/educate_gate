import classDAO from "../../repositories/class/index.js";
import userDAO from "../../repositories/user/index.js";
const createNewListClass = async (req, res) => {
  try {
    const { suffName, preName, quantity, limitStudent } = req.body;
    const result = await classDAO.createNewListClass({
      suffName: suffName.toUpperCase(),
      preName: preName.toUpperCase(),
      quantity,
      limitStudent,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getClasses = async (req, res, next) => {
  try {
    const { item, order, limit, skip } = req.query;
    const result = await classDAO.getClasses({
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
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getClassById = async (req, res) => {
  const { classId } = req.params;
  try {
    const result = await classDAO.findClassById(classId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getClassesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let user;
    let result = await classDAO.getClassesByUserId(userId);
    if (result.length === 0) {
      user = await userDAO.findUserById(userId);
      result = user?.classId;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};
export default {
  createNewListClass,
  getClasses,
  getStudentInClass,
  getClassById,
  getClassesByUserId,
};
